from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.database import get_db
from src.schemas.maintenance import MaintenanceCreate, MaintenanceUpdate, Maintenance
from src.crud.maintenance import maintenance_crud

router = APIRouter()

@router.get("/maintenances/")
def read_maintenances(db: Session = Depends(get_db)):
    maintenances = maintenance_crud.get_maintenances(db)
    return maintenances

@router.post("/maintenances/")
def create_maintenance(maintenance: MaintenanceCreate, db: Session = Depends(get_db)):
    db_maintenance = maintenance_crud.get_maintenance_by_machine_id(db, maintenance.machine_id)
    if db_maintenance:
        raise HTTPException(status_code=400, detail="Maintenance already exists for this machine")
    return maintenance_crud.create_maintenance(db, maintenance)

@router.get("/maintenances/{id}")
def read_maintenance(id: int, db: Session = Depends(get_db)):
    maintenance = maintenance_crud.get_maintenance(db, id)
    if not maintenance:
        raise HTTPException(status_code=404, detail="Maintenance not found")
    return maintenance

@router.put("/maintenances/{id}")
def update_maintenance(id: int, maintenance: MaintenanceUpdate, db: Session = Depends(get_db)):
    db_maintenance = maintenance_crud.get_maintenance(db, id)
    if not db_maintenance:
        raise HTTPException(status_code=404, detail="Maintenance not found")
    return maintenance_crud.update_maintenance(db, db_maintenance, maintenance)

@router.delete("/maintenances/{id}")
def delete_maintenance(id: int, db: Session = Depends(get_db)):
    maintenance = maintenance_crud.get_maintenance(db, id)
    if not maintenance:
        raise HTTPException(status_code=404, detail="Maintenance not found")
    maintenance_crud.delete_maintenance(db, maintenance)
    return {"message": "Maintenance deleted"}

