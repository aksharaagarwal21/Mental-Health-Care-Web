
from app.core.database import get_db

async def retrieve_context(query: str, k: int = 3) -> list:
    db = get_db()
    if db is None: return []
    articles = await db.articles.find({"status": "approved"}, {"title": 1, "content": 1}).limit(50).to_list(50)
    return articles[:k]

async def generate_response(message: str, context: list) -> str:
    try:
        from groq import Groq
        from app.core.config import settings
        g = Groq(api_key=settings.GROQ_API_KEY)
        ctx = "\n\n".join([f"{a.get('title','')}:\n{a.get('content','')[:400]}" for a in context])
        r = g.chat.completions.create(
            model=settings.MODEL_NAME,
            messages=[
                {"role":"system","content":"You are a compassionate mental health assistant for India. Answer based on provided context. Be empathetic and culturally sensitive. Recommend iCall (9152987821) for serious concerns."},
                {"role":"user","content":f"Context:\n{ctx}\n\nQuestion: {message}"}
            ], max_tokens=400)
        return r.choices[0].message.content
    except Exception as e:
        return "I cannot respond right now. For immediate support, call iCall: 9152987821 (free, Mon-Sat 8am-10pm)."
