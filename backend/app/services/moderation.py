
async def moderate_message(text: str) -> dict:
    spam = ["advertisement", "buy now", "guaranteed cure"]
    if any(s in text.lower() for s in spam):
        return {"safe": False, "reason": "Spam"}
    return {"safe": True, "reason": None}

async def moderate_article(title: str, content: str) -> dict:
    try:
        from groq import Groq
        from app.core.config import settings
        import json
        g = Groq(api_key=settings.GROQ_API_KEY)
        prompt = f"""Review this mental health article for: harmful advice, bias, misinformation.
Title: {title}\nContent: {content[:600]}
Respond ONLY with JSON: {{"approved": true, "issues": [], "bias_detected": false, "safety_score": 8}}"""
        r = g.chat.completions.create(model="llama3-8b-8192", messages=[{"role":"user","content":prompt}], max_tokens=100)
        return json.loads(r.choices[0].message.content)
    except:
        return {"approved": True, "issues": [], "bias_detected": False, "safety_score": 8}
