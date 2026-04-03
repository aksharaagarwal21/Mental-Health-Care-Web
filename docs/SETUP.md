# Setup Guide for VS Code

## Prerequisites
- Node.js 18+ (download from nodejs.org)
- Python 3.10+ (download from python.org)
- MongoDB Atlas account (free at mongodb.com/atlas)
- Groq API key (free at console.groq.com)
- Firebase project (free at console.firebase.google.com)

## Step 1 — Clone & Open in VS Code
```bash
# Open the bloodwing folder in VS Code
code bloodwing/
```

## Step 2 — Backend Setup
```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate (Windows)
venv\Scripts\activate
# Activate (Mac/Linux)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Copy and fill environment variables
cp .env.example .env
# Edit .env with your MongoDB URL, Groq API key, etc.

# Run backend
uvicorn app.main:app --reload --port 8000
# Backend now running at http://localhost:8000
# API docs at http://localhost:8000/docs
```

## Step 3 — Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Copy and fill environment variables
cp .env.example .env.local
# Edit .env.local with your Firebase config

# Run frontend
npm run dev
# Frontend now running at http://localhost:3000
```

## Step 4 — MongoDB Atlas Setup
1. Go to mongodb.com/atlas and create free account
2. Create a free cluster (M0)
3. Create database user
4. Get connection string and add to backend .env as MONGODB_URL

## Step 5 — Groq API (Free AI)
1. Go to console.groq.com and sign up free
2. Create API key
3. Add to backend .env as GROQ_API_KEY
4. Free tier gives 30 req/min (enough for development)

## Step 6 — Firebase (Anonymous Auth)
1. Go to console.firebase.google.com
2. Create new project
3. Enable Authentication > Anonymous
4. Copy web config to frontend .env.local

## Running Both Together (VS Code)
Install the "Better Terminal" extension and run:
- Terminal 1: cd backend && uvicorn app.main:app --reload
- Terminal 2: cd frontend && npm run dev

## Deployment
- Frontend: Deploy to Vercel (free) using vercel.json config
- Backend: Deploy to Render (free) using render.yaml config

## ML Fine-tuning (Optional)
1. Open ml/training/finetune.py in Google Colab
2. Upload training data following ml/data/README.md
3. Run cells — takes ~2-4 hours on free T4 GPU
4. Push model to HuggingFace Hub
5. Update GROQ_API_KEY or HF model path in backend config
