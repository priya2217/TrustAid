import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/trustaid";

const hashPassword = (password) =>
  crypto.scryptSync(password, "trustaid-auth-salt", 64).toString("hex");

const verifyPassword = (password, passwordHash = "") => {
  const supplied = Buffer.from(hashPassword(password), "hex");
  const stored = Buffer.from(passwordHash, "hex");
  return supplied.length === stored.length && crypto.timingSafeEqual(supplied, stored);
};

const sanitizeUser = (user) => ({
  id: user._id.toString(),
  email: user.email,
  fullName: user.fullName || "",
  role: user.role,
  createdAt: user.createdAt,
});

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected to:", MONGO_URI))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", message: "TrustAid Backend + MongoDB running!" });
});

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  fullName: String,
  passwordHash: { type: String, required: true },
  role: {
    type: String,
    enum: ["beneficiary", "donor", "ngo"],
    default: "beneficiary",
  },
  createdAt: { type: Date, default: Date.now },
});
const User = mongoose.model("User", UserSchema);

app.post("/api/auth/register", async (req, res) => {
  try {
    const { email, password, fullName, role } = req.body;

    if (!email || !password || !fullName || !role) {
      return res
        .status(400)
        .json({ error: "Email, password, full name, and role are required." });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ error: "An account with this email already exists." });
    }

    const user = await User.create({
      email: email.toLowerCase(),
      fullName,
      passwordHash: hashPassword(password),
      role,
    });

    res.status(201).json({ user: sanitizeUser(user) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !verifyPassword(password, user.passwordHash)) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    res.json({ user: sanitizeUser(user) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const RequestSchema = new mongoose.Schema({
  title: { type: String, required: true },
  amount: Number,
  description: String,
  category: String,
  urgency: String,
  location: String,
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  aiScore: Number,
  ngoApproved: { type: Boolean, default: false },
  fundedAmount: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected", "funded"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});
const Request = mongoose.model("Request", RequestSchema);

const DonationSchema = new mongoose.Schema({
  amount: Number,
  donorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  requestId: { type: mongoose.Schema.Types.ObjectId, ref: "Request", required: true },
  txHash: String,
  status: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});
const Donation = mongoose.model("Donation", DonationSchema);

app.get("/api/requests", async (req, res) => {
  try {
    const { category, urgency, ownerId } = req.query;
    const query = {};
    if (category) query.category = category;
    if (urgency) query.urgency = urgency;
    if (ownerId) query.ownerId = ownerId;
    const requests = await Request.find(query).populate("ownerId", "fullName email");
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/requests", async (req, res) => {
  try {
    const request = new Request(req.body);
    await request.save();
    const populated = await Request.findById(request._id).populate("ownerId", "fullName email");
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/users", async (_req, res) => {
  try {
    const users = await User.find({}, "fullName email role createdAt");
    res.json(users.map((user) => sanitizeUser(user)));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/users", async (req, res) => {
  try {
    const { email, password, fullName, role } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }
    const user = new User({
      email: email.toLowerCase(),
      fullName,
      role,
      passwordHash: hashPassword(password),
    });
    await user.save();
    res.status(201).json(sanitizeUser(user));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/donations", async (req, res) => {
  try {
    const { donorId } = req.query;
    const query = donorId ? { donorId } : {};
    const donations = await Donation.find(query).populate("donorId requestId");
    res.json(donations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/donations", async (req, res) => {
  try {
    const donation = new Donation(req.body);
    await donation.save();
    const populated = await Donation.findById(donation._id).populate("donorId requestId");
    const targetRequest = await Request.findById(req.body.requestId);
    const currentFunded = targetRequest?.fundedAmount || 0;
    const targetAmount = targetRequest?.amount || 0;
    const nextFunded = currentFunded + req.body.amount;
    await Request.findByIdAndUpdate(req.body.requestId, {
      $inc: { fundedAmount: req.body.amount },
      $set: { status: nextFunded >= targetAmount ? "funded" : "approved" },
    });
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
