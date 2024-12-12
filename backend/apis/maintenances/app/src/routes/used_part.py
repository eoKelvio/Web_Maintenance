from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db, save_to_db
from ..models.used_part import UsedPartModels 
from ..schemas import UsedPartRequest, UsedPartResponse

router = APIRouter(prefix="/maintenances/{maintenance_id}/used_parts")

@router.get("/", response_model=list[UsedPartResponse])
def get_used_parts(maintenance_id: int, db: Session = Depends(get_db)):
    used_parts = db.query(UsedPartModels).filter(UsedPartModels.maintenance_id == maintenance_id).all()
    return used_parts

@router.post("/", response_model=UsedPartResponse)
def create_used_part(maintenance_id: int, data: UsedPartRequest, db: Session = Depends(get_db)):
    used_part_data = data.model_dump()
    used_part_data["maintenance_id"] = maintenance_id
    used_part = save_to_db(db, UsedPartModels, used_part_data)
    return used_part

@router.put("/{used_part_id}", response_model=UsedPartResponse)
def update_used_part(maintenance_id: int, used_part_id: int, data: UsedPartRequest, db: Session = Depends(get_db)):
    used_part = db.query(UsedPartModels).filter(
        UsedPartModels.id == used_part_id, 
        UsedPartModels.maintenance_id == maintenance_id
    ).first()
    if not used_part:
        raise HTTPException(status_code=404, detail="Used part not found for the specified maintenance ID")
    
    for key, value in data.model_dump().items():
        setattr(used_part, key, value)
    db.commit()
    db.refresh(used_part)
    return used_part

@router.delete("/{used_part_id}", response_model=dict)
def delete_used_part(maintenance_id: int, used_part_id: int, db: Session = Depends(get_db)):
    used_part = db.query(UsedPartModels).filter(
        UsedPartModels.id == used_part_id, 
        UsedPartModels.maintenance_id == maintenance_id
    ).first()
    if not used_part:
        raise HTTPException(status_code=404, detail="Used part not found for the specified maintenance ID")
    
    db.delete(used_part)
    db.commit()
    return {"message": "Used part deleted"}
