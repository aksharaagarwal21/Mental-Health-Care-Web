
from fastapi import APIRouter
from pydantic import BaseModel
from app.services.rag import retrieve_context, generate_response
from app.services.crisis import detect_crisis

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    article_id: str = None

@router.post("/")
async def chat(req: ChatRequest):
    crisis = detect_crisis(req.message)
    if crisis["crisis_detected"]:
        return {"response": "You are not alone. Please call iCall at 9152987821 (free, Mon-Sat 8am-10pm) or Vandrevala Foundation at 1860-2662-345 (24/7).", "crisis_detected": True, "helplines": crisis["helplines"]}
    context = await retrieve_context(req.message)
    response = await generate_response(req.message, context)
    return {"response": response, "crisis_detected": False}
