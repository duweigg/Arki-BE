
# 💸 MVP Invest Dashboard

A simplified family investment dashboard designed for parents and children to track portfolio growth and communicate in real-time via group chat.

Built with **Next.js**, **Node.js**, and **WebSocket**.

---

## 🚀 Features

- Role-based login for Parent, Co-Parent, and Child
- Child-friendly investment dashboard with visual chart
- Real-time family chat using WebSocket
- Mock investment data and company facts
- Fully responsive UI with Tailwind CSS

---

## 📁 Folder Structure

```
mvp-invest-dashboard/
├── backend/
│   ├── src/
│   │   ├── routers/        # Express routes
│   │   ├── mock-data/     # JSON mock data
│   ├── server.ts          # Entry point for backend
│   └── ws-server.ts   # WebSocket server
│   └── routes        # Express routes
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/           # Next.js pages & components
│   │   └── components/    # Reusable UI components
│   └── package.json
└── README.md
```

---

## 🛠 Tech Stack

- **Frontend:** Next.js (App Router) + Tailwind CSS + Chart.js
- **Backend:** Node.js + Express + WebSocket (native `ws`)
- **Mock Data:** JSON files (no database required)
- **Charting:** `react-chartjs-2` + Chart.js
- **Real-time Chat:** WebSocket server with broadcast per family group

---

## 🧪 Setup & Run Instructions

### 1. Clone the repo

```bash
git clone https://github.com/duweigg/mvp-invest-dashboard.git
cd mvp-invest-dashboard
```

### 2. Start the backend

```bash
cd backend
npm install
npm run dev
```

Runs at: [http://localhost:4000](http://localhost:4000)

### 3. Start the frontend

```bash
cd ../frontend
npm install
npm run dev
```

Runs at: [http://localhost:3000](http://localhost:3000)

---

## 🔐 Roles (for testing)

| Role       | Name    | Role       | User ID         |
|------------|---------|------------|-----------------|
| Parent     | Mum     | Parent     | parent_001      |
| Co-Parent  | Dad     | Co-Parent  | co_parent_001   |
| Child      | Sophie  | Child      | child_001       |

Use these in the login screen to simulate switching between roles. Please use extact same name for login (case-sensitive)

---

## 📊 Dashboard Overview

Child dashboard includes:

- Total portfolio value (e.g. `S$3,200`)
- Monthly performance
- Friendly brand list with fun facts
- “Ask My Parent” button that opens the chat

---

## 💬 Chat Behavior

- Messages are stored by family ID
- Each message includes role, name, timestamp
- WebSocket clients join per-family group via `ws://.../?familyId=...`
- Messages persist in `chatMessages.json`

---
