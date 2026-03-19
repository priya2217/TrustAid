# 🌍 TrustAid – AI + Blockchain‑Verified Donation Platform

*TrustAid* is an end‑to‑end donation platform that makes every rupee traceable. By fusing *AI verification* (OCR + face matching + receipt analysis) with *Algorand smart contracts*, it gives donors cryptographic proof that their money helped real people.

---

## 🚀 Live Demo

*URL:* [https://trustaid.bolt.new](https://trustaid.bolt.new)  (auto‑deployed via Netlify)

---

## 📌 Features

* *🧠 AI Identity Verification*
  ▸ OCR reads beneficiary ID cards
  ▸ DeepFace matches selfie ↔ ID photo
  ▸ Generates fraud‑prevention confidence score
* *📄 NGO Proof + AI Receipt Check*
  ▸ NGOs review requests and upload delivery proof
  ▸ OCR validates receipt totals, dates, items
  ▸ Second AI score rates proof reliability
* *🔗 Algorand‑Powered Trust*
  ▸ Donations flow through a PyTeal escrow contract
  ▸ Transaction + IPFS CID written on‑chain
  ▸ Donors can audit via AlgoExplorer
* *💸 Donor Dashboard*
  ▸ Browse verified aid requests
  ▸ Fund with Pera Wallet in one click
  ▸ Track images, receipts, and blockchain status in real time

---

## 🏗 Tech Stack

| Layer      | Tech / Service                               |
| ---------- | -------------------------------------------- |
| Frontend   | React + Tailwind CSS (built on Bolt.new)     |
| Backend    | Express + MongoDB (Auth + API)               |
| AI Engine  | Python (DeepFace, Tesseract / Google Vision) |
| Blockchain | Algorand (TestNet) + PyTeal + Pera Wallet    |
| DevOps     | Netlify (CI/CD) • IONOS Domain via Entri     |

---

## 🔁 Workflow — How It Works

1. *Beneficiary* uploads ID + selfie → AI verifies identity.
2. Submits aid request → moves to *NGO* queue.
3. *NGO* approves and later uploads photo + receipt → AI checks proof.
4. Request marked *verified* → visible to *Donor*.
5. *Donor* funds via Pera Wallet → PyTeal escrow holds & releases funds.
6. Donor sees proof, AI scores, and on‑chain Tx hash — total transparency.

---

## 📂 Project Structure

text
trustaid/
├─ frontend/            # React app (Bolt.new)
│  ├─ src/components/   # Reusable UI parts
│  └─ ...
├─ contracts/           # PyTeal smart contracts
├─ ai‑verification/     # OCR & face‑match Python scripts
├─ docs/                # Design docs & pitch deck
└─ README.md            # You are here


---

## 🛠 Local Setup

bash
# 1️⃣ Clone repo
$ git clone https://github.com/yourname/trustaid.git
$ cd trustaid

# 2️⃣ Frontend
$ cd frontend
$ npm install && npm start   # runs on http://localhost:3000

# 3️⃣ AI scripts (optional)
$ cd ../ai-verification
$ python3 -m venv venv && source venv/bin/activate
$ pip install -r requirements.txt
$ python run.py               # test OCR & face match


> *Note:* The frontend talks to the local backend through `/api`. Add backend values in `backend/.env` when needed.

---

## 🏆 Hackathon Eligibility Checklist

* *Blockchain Challenge* ✔ — built entirely on *Algorand*
* *Deploy Challenge* ✔ — auto‑deployed via *Netlify*
* *Startup Challenge* ✔ — scalable on *MongoDB* backend
* *Custom Domain Challenge* ✔ — live at trustaid.io (IONOS)

---

## 📜 License

MIT — free to fork, improve, and fight donation fraud worldwide.

---

## 🙌 Contributors

| Name           | Role                             |
| -------------- | -------------------------------- |
| Priya K | Frontend • UI / UX  |
| Dinesh Kumar R | Backend • Blockchain |

---

> “Give with trust. Verify with TrustAid.”
