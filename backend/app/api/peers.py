
from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from app.services.peer_matching import find_peers

router = APIRouter()

class PeerRequest(BaseModel):
    situations: List[str]

@router.post("/")
async def match_peers(req: PeerRequest):
    matches = await find_peers(req.situations)
    return {"matches": matches}
