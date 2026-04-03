
from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings

client = None
db = None

async def connect_db():
    global client, db
    client = AsyncIOMotorClient(settings.MONGODB_URL)
    db = client[settings.MONGODB_DB]
    print("Connected to MongoDB")

async def close_db():
    global client
    if client: client.close()

def get_db():
    return db
