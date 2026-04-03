
from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from app.core.database import get_db
from app.services.crisis import detect_crisis
import uuid

router = APIRouter()
SUGGESTIONS = {5:["Maintaining mental wellness","Building resilience"],4:["Mindfulness for India","Sleep hygiene"],3:["Grounding techniques","Breathing exercises"],2:["When feeling low","Peer support resources"],1:["Crisis resources","iCall counselling guide"]}

class MoodRequest(BaseModel):
    mood_value: int
    note: Optional[str] = None
    region: Optional[str] = None

@router.post("/")
async def log_mood(req: MoodRequest):
    db = get_db()
    crisis = detect_crisis(req.note or "")
    if db:
        await db.mood_logs.insert_one({"_id": str(uuid.uuid4()), "mood_value": req.mood_value, "region": req.region, "created_at": datetime.utcnow()})
    return {"logged": True, "suggested_articles": SUGGESTIONS.get(req.mood_value, []), "crisis_detected": crisis["crisis_detected"], "helplines": crisis["helplines"] if crisis["crisis_detected"] else []}
