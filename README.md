# SmartPack – Knapsack Optimizer 🎒

SmartPack is a modern, visually stunning web application designed to solve the classic **0/1 Knapsack Problem**. It features a premium "glassmorphism" dark theme and a high-performance backend, making algorithm visualization both functional and beautiful.

## ✨ Features
- **Dynamic Input Forms:** Easily add multiple items with specific weights and profits.
- **Algorithm Optimization:** Calculates the maximum possible profit based on the knapsack's total capacity.
- **Premium UI/UX:** Built with React and Vite, featuring smooth micro-animations, neon accents, and responsive design.
- **Dual Backend Architecture:** 
  - A local C-based prototype for educational algorithm demonstrations.
  - A JavaScript Serverless Function port for seamless, zero-config cloud deployments.

---

## 🏗️ Architecture & Technologies

- **Frontend:** React + Vite + Vanilla CSS (Glassmorphism design)
- **Local Backend:** Node.js (Express) spawning a compiled `C` executable (`knapsack.c`).
- **Cloud Backend:** Vercel Serverless Functions (`api/optimize.js`).

### Why two backends?
The `backend/knapsack.c` file contains a highly readable recursive implementation of the 0/1 Knapsack logic. This is kept in the repository for **educational and explanation purposes**. However, because cloud hosting platforms like Vercel do not natively compile or run C binaries, the exact same recursive logic was ported to JavaScript (`frontend/api/optimize.js`) to allow for seamless cloud deployments!

---

## 🚀 How to Run Locally

If you want to run the project on your own machine, follow these steps:

### 1. Clone the repository
```bash
git clone https://github.com/VIRAJSV26/ADA-Mini-project.git
cd ADA-Mini-project
```

### 2. Start the Frontend
The frontend is located in the `frontend` directory.
```bash
cd frontend
npm install
npm run dev
```
The React app will be available at `http://localhost:5173/`.

*(Note: By default, the frontend now points to `/api/optimize` for Vercel deployment. If you want to use the local Node.js + C backend, change the fetch URL in `App.jsx` back to `http://localhost:3000/api/optimize`)*.

### 3. Start the Local Node.js + C Backend (Optional)
If you want to test the raw C implementation:
```bash
cd backend
npm install
gcc knapsack.c -o knapsack
node server.js
```
The backend server will run on `http://localhost:3000/`.

---

## ☁️ Deployment (Vercel)

This project is pre-configured to be deployed on **Vercel**:
1. Import this GitHub repository into Vercel.
2. Under "Project Settings", set the **Root Directory** to `frontend`.
3. Vercel will automatically detect Vite and configure the `api/` folder as a Serverless API!
