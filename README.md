# TrustAid

TrustAid is a full-stack donation platform focused on transparent aid delivery. The project currently uses a React frontend and an Express + MongoDB backend, with room for AI verification and blockchain integration as the product evolves.

## Structure

```text
TrustAid/
├─ backend/   # Express + MongoDB API
├─ frontend/  # React + Vite client
└─ README.md  # Project overview
```

## Tech Stack

- Frontend: React, Vite, Tailwind CSS
- Backend: Express, MongoDB, Mongoose
- Auth: MongoDB-backed email/password flow
- Tooling: ESLint, TypeScript, Nodemon

## Local Setup

### 1. Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs on `http://localhost:3001`.

Required backend env file:

```env
MONGO_URI=mongodb://127.0.0.1:27017/trustaid
PORT=3001
NODE_ENV=development
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on the Vite dev server and proxies `/api` requests to `http://localhost:3001`.

## Key Endpoints

- `GET /api/health`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/requests`
- `POST /api/requests`
- `GET /api/users`
- `GET /api/donations`

## Notes

- Frontend-specific project details are in [frontend/README.md](/c:/Users/PRIYA/OneDrive/Attachments/Projects/BOLT/TrustAid/frontend/README.md).
- The old Supabase-based auth flow was replaced with MongoDB-backed auth.
- `backend/.env` is intentionally local and should not be committed.
