
from fastapi import APIRouter, Form
from app.core.database import get_db
from datetime import datetime
import uuid

router = APIRouter()

@router.post("/")
async def submit_verification(name: str = Form(...), reg_number: str = Form(...), specialty: str = Form(...), institution: str = Form(...), email: str = Form(...)):
    db = get_db()
    if db:
        await db.doctor_verifications.insert_one({"_id": str(uuid.uuid4()), "name": name, "reg_number": reg_number, "specialty": specialty, "institution": institution, "email": email, "status": "pending", "created_at": datetime.utcnow()})
    return {"submitted": True, "message": "Verification request received. We will check with MCI/NMC and respond within 24-48 hours."}

@router.get("/verified")
async def list_verified():
    db = get_db()
    if not db: return {"doctors": []}
    doctors = await db.doctor_verifications.find({"status": "approved"}, {"email": 0, "reg_number": 0}).to_list(50)
    for d in doctors: d["id"] = str(d.pop("_id", ""))
    return {"doctors": doctors}
