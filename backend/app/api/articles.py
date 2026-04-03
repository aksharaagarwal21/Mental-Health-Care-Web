
from fastapi import APIRouter, HTTPException
from app.core.database import get_db
from app.models.article import ArticleCreate
from app.services.moderation import moderate_article
from app.services.crisis import detect_crisis
from datetime import datetime
import uuid

router = APIRouter()

@router.get("/")
async def list_articles(category: str = None, search: str = None, page: int = 1, limit: int = 20):
    db = get_db()
    query = {"status": "approved"}
    if category: query["category"] = category
    skip = (page - 1) * limit
    articles = await db.articles.find(query, {"content": 0}).skip(skip).limit(limit).to_list(limit)
    total = await db.articles.count_documents(query)
    for a in articles: a["id"] = str(a.pop("_id", ""))
    return {"articles": articles, "total": total}

@router.get("/{article_id}")
async def get_article(article_id: str):
    db = get_db()
    a = await db.articles.find_one({"_id": article_id})
    if not a: raise HTTPException(404, "Not found")
    await db.articles.update_one({"_id": article_id}, {"$inc": {"views": 1}})
    a["id"] = str(a.pop("_id", ""))
    return a

@router.post("/")
async def create_article(data: ArticleCreate):
    db = get_db()
    mod = await moderate_article(data.title, data.content)
    crisis = detect_crisis(data.content)
    article = {"_id": str(uuid.uuid4()), **data.dict(), "author_name": "Anonymous",
               "status": "approved" if mod.get("approved") else "pending",
               "ai_verified": mod.get("approved", False), "bias_checked": not mod.get("bias_detected", False),
               "views": 0, "likes": 0, "created_at": datetime.utcnow(), "crisis_flagged": crisis["crisis_detected"]}
    await db.articles.insert_one(article)
    return {"id": article["_id"], "status": article["status"]}

@router.post("/{article_id}/like")
async def like_article(article_id: str):
    db = get_db()
    await db.articles.update_one({"_id": article_id}, {"$inc": {"likes": 1}})
    return {"liked": True}
