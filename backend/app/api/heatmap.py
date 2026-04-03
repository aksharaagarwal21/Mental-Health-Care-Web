
from fastapi import APIRouter
from app.core.database import get_db

router = APIRouter()

@router.get("/")
async def get_heatmap():
    db = get_db()
    if not db: return {"heatmap": []}
    pipeline = [{"$match":{"region":{"$ne":None}}},{"$group":{"_id":{"region":"$region","mood":"$mood_value"},"count":{"$sum":1}}}]
    data = await db.mood_logs.aggregate(pipeline).to_list(500)
    return {"heatmap": data}
