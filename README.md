# 🧠 Bloodwing — Mental Health Care Platform

A full-stack mental health care web application that provides personalized, role-specific dashboards for **patients**, **doctors**, and **caregivers** — powered by AI-driven sentiment analysis and an intelligent wellness chatbot.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109-009688?logo=fastapi&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## ✨ Key Features

- **Role-Based Dashboards** — Distinct UIs for patients (calm/warm), doctors (professional), and caregivers (supportive)
- **AI Wellness Chatbot (Aura)** — Mood-aware chatbot with real-time sentiment analysis and crisis detection
- **Interactive Mood Gauge** — Visual arc meter for daily mood tracking with journal integration
- **Smart Onboarding** — Role-specific onboarding flows with themed registration pages
- **Weekly Journal** — Write, view, and manage personal journal entries with mood tags
- **Wellness Tasks & Exercises** — Curated activities like mindful breathing, gratitude lists, and guided meditation
- **Crisis Support** — Automatic crisis detection with helpline numbers (iCall, NIMHANS, Vandrevala Foundation)

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Framer Motion, Tailwind CSS |
| Backend | FastAPI, Uvicorn, Motor (MongoDB async) |
| AI/ML | Custom Sentiment Engine, Groq LLM API |
| Database | MongoDB Atlas |
| Auth | Zustand + localStorage |

---

## 🚀 Quick Setup

### Prerequisites
- Node.js 18+
- Python 3.10+
- MongoDB (local or Atlas)

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Opens at `http://localhost:3000`

### Backend

```bash
cd backend
pip install -r requirements.txt
cp .env.example .env    # fill in your keys
uvicorn app.main:app --reload
```

Runs at `http://localhost:8000`

---

## 📁 Project Structure

```
bloodwing/
├── frontend/          # React + Vite SPA
│   ├── src/
│   │   ├── components/    # Navbar, AuthModal, AIChatbot
│   │   ├── pages/         # Landing, Home, Dashboards, Auth pages
│   │   ├── stores/        # Zustand auth store
│   │   ├── utils/         # Sentiment engine
│   │   └── styles/        # Dashboard & auth CSS
│   └── vercel.json        # Deployment config
├── backend/           # FastAPI server
│   ├── app/
│   │   ├── api/           # Route handlers
│   │   ├── core/          # Config, database
│   │   ├── models/        # Data models
│   │   └── services/      # Business logic
│   └── render.yaml        # Deployment config
└── ml/                # ML models & notebooks
```

---

## 🔮 Future Enhancements

### 1. 🌐 Multi-Language AI Support
Integrate multilingual NLP models (e.g., **IndicBERT**, **mBERT**) to support mental health conversations in **Hindi, Tamil, Bengali, Telugu** and other regional languages — making the platform accessible to non-English speakers across India.

### 2. 🎙️ Voice-Based Mood Detection
Add speech-to-text + **vocal emotion recognition** using models like Wav2Vec 2.0 to analyze tone, pitch, and speech patterns — detecting stress, sadness, or anxiety from voice alone, enabling hands-free mood logging.

### 3. 📊 Predictive Mental Health Analytics
Use **time-series ML models** (LSTM/Prophet) on historical mood, sleep, and journal data to predict mood trends and flag early warning signs of depressive episodes — alerting doctors and caregivers proactively.

### 4. 🤖 AI-Powered Personalized Therapy Plans
Leverage **LLM fine-tuning** (Llama 3 / GPT-4) to generate personalized CBT (Cognitive Behavioral Therapy) exercises, coping strategies, and daily wellness plans tailored to each patient's mood history and concerns.

### 5. 🧬 Facial Emotion Recognition
Integrate **real-time facial emotion detection** using computer vision (DeepFace/FER) during video check-ins — allowing the platform to passively gauge emotional state during therapy sessions and auto-log mood without manual input.

---

## 👥 Team

Built with ❤️ for better mental health care.

## 📄 License

MIT License — feel free to use, modify, and distribute.
