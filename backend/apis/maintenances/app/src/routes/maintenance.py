from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from ..database import get_db, save_to_db
from ..models.maintenance import MaintenanceModels 
from ..schemas import MaintenanceRequest, MaintenanceResponse

router = APIRouter(prefix="/maintenance")

@router.get("/")
def get_all_maintenances(db: Session = Depends(get_db)):
    maintenances = db.query(MaintenanceModels).all()
    return maintenances

@router.post("/", response_model=MaintenanceResponse)
def create_maintenance(data: MaintenanceRequest, db: Session = Depends(get_db)):
    try:
        maintenance_data = data.model_dump()
        maintenance = save_to_db(db, MaintenanceModels, maintenance_data)
        return maintenance
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error saving to database: {str(e)}")
    
@router.get("/{maintenance_id}", response_model=MaintenanceResponse)
def get_maintenance(maintenance_id: int, db: Session = Depends(get_db)):
    maintenance = db.query(MaintenanceModels).get(maintenance_id)
    if maintenance is None:
        raise HTTPException(status_code=404, detail="Maintenance not found")
    return maintenance

@router.put("/{maintenance_id}", response_model=MaintenanceResponse)
def update_maintenance(maintenance_id: int, data: MaintenanceRequest, db: Session = Depends(get_db)):
    maintenance = db.query(MaintenanceModels).get(maintenance_id)
    if maintenance is None:
        raise HTTPException(status_code=404, detail="Maintenance not found")
    try:
        for key, value in data.model_dump().items():
            setattr(maintenance, key, value)
        db.commit()
        db.refresh(maintenance)
        return maintenance
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error updating maintenance: {str(e)}")
    
@router.delete("/{maintenance_id}", response_model=dict)
def delete_maintenance(maintenance_id: int, db: Session = Depends(get_db)):
    maintenance = db.query(MaintenanceModels).get(maintenance_id)                        
    if maintenance is None:
        raise HTTPException(status_code=404, detail="Maintenance not found")
    try:
        db.delete(maintenance)
        db.commit()
        return {"message": "Maintenance deleted"}
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error deleting maintenance: {str(e)}")
    
@router.get("/machine/{machineId}", response_model=list[MaintenanceResponse])
def get_maintenances_by_machine(machineId: int, db: Session = Depends(get_db)):
    maintenances = db.query(MaintenanceModels).filter(MaintenanceModels.machine_id == machineId).all()
    return maintenances

@router.get("/team/{teamId}", response_model=list[MaintenanceResponse])
def get_maintenances_by_team(teamId: int, db: Session = Depends(get_db)):
    maintenances = db.query(MaintenanceModels).filter(MaintenanceModels.team_id == teamId).all()
    return maintenances

