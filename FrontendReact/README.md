# 🏏 Dream11 Fan Command Center — React Frontend

A modular, clean, and modern React frontend built with **React 19 + Vite + Chart.js**.

---

## 🚀 Quick Start Commands

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm start
# (or: npm run dev)
```

The app will immediately run at: **`http://localhost:5173/`**

---

## 📂 Project Architecture (Clean & Understandable)

Every feature has its own self-contained component with clean code and plain-English comments:

```
DemoFrontendReact/
├── index.html                       ← HTML entry point with Google Fonts (Outfit & JetBrains Mono)
├── package.json                     ← Scripts: npm start, npm run dev, npm run build
├── src/
│   ├── main.jsx                     ← Mounts <App /> into root DOM
│   ├── index.css                    ← Dark stadium theme, glassmorphism, responsive grid
│   ├── App.jsx                      ← Main state coordinator & 6-tab navigation
│   └── components/
│       ├── Scoreboard.jsx           ← Live Match score, RRR, and Win Probability bar
│       ├── PressureMeter.jsx        ← 🎯 Feature 1: SVG tension gauge (0-100) & spike moments
│       ├── MomentumTracker.jsx      ← 📈 Feature 2: Over 1-20 swing chart (Chart.js)
│       ├── AICommentary.jsx         ← 🎙️ Feature 3: 4 personas (Harsha, Sidhu, Gen-Z, Coach)
│       ├── CatchUp60s.jsx           ← ⚡ Feature 4: Over slider (1-20) & instant brief
│       ├── DreamTeamRescue.jsx      ← 🏏 Feature 5: Lineup, C (2x) & VC (1.5x) multipliers
│       └── LieDetector.jsx          ← 🔍 Feature 6: Cricket myth vs fact verifier
```

---

## 🌟 The 6 Features Explained

| # | Feature | Component File | What It Does |
|---|---|---|---|
| **1** | **Pressure-O-Meter** | `PressureMeter.jsx` | Calculates real-time tension (0–100) with animated SVG arc needle and delivery pressure moments. |
| **2** | **Momentum Tracker** | `MomentumTracker.jsx` | Interactive Chart.js multi-line graph showing over-by-over win-rate swings. |
| **3** | **Multi-Persona Commentary** | `AICommentary.jsx` | Voices live ball events in 4 styles (*The Poet*, *Sidhu Shayari*, *Gen-Z Meme*, *Tactical Coach*). |
| **4** | **Catch-Up in 60s** | `CatchUp60s.jsx` | Slider for fans who tuned in late to get instant AI recap of preceding overs. |
| **5** | **Dream Team Rescue** | `DreamTeamRescue.jsx` | Evaluates C (2x) & VC (1.5x) impact, highlights MVP & liabilities, and suggests 2nd-innings swaps. |
| **6** | **Cricket Lie Detector** | `LieDetector.jsx` | Cross-references cricket debates against stats to give **TRUE**, **PARTIAL**, or **MYTH** verdicts. |
