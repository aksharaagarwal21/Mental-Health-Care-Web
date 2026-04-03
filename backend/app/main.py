from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.database import connect_db, close_db
from app.api import articles, chat, mood, peers, heatmap, verify

app = FastAPI(title="Bloodwing Mental Health API", version="1.0.0")

app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

app.include_router(articles.router, prefix="/api/articles", tags=["Articles"])
app.include_router(chat.router, prefix="/api/chat", tags=["Chat"])
app.include_router(mood.router, prefix="/api/mood", tags=["Mood"])
app.include_router(peers.router, prefix="/api/peer-match", tags=["Peers"])
app.include_router(heatmap.router, prefix="/api/heatmap", tags=["Heatmap"])
app.include_router(verify.router, prefix="/api/verify-doctor", tags=["Doctors"])

@app.on_event("startup")
async def startup(): await connect_db()

@app.on_event("shutdown")
async def shutdown(): await close_db()

@app.get("/health")
async def health(): return {"status": "ok"}
