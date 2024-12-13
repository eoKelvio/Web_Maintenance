from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import get_db, save_to_db
from ..models.maintenance import MaintenanceModels
from ..schemas import MaintenanceRequest, MaintenanceResponse

router = APIRouter(prefix="/maintenance")

@router.get("/")
def get_all_maintenances(db: Session = Depends(get_db)):
    """
    Retrieve all maintenance records from the database.

    Args:
        db (Session): The database session.

    Returns:
        list: A list of all maintenance records.
    """

    maintenances = db.query(MaintenanceModels).all()
    return maintenances

@router.post("/", response_model=MaintenanceResponse)
def create_maintenance(data: MaintenanceRequest, db: Session = Depends(get_db)):
    """
    Create a new maintenance record.

    Args:
        data (MaintenanceRequest): The maintenance data.
        db (Session): The database session.

    Returns:
        MaintenanceResponse: The created maintenance record.
    """

    maintenance_data = data.model_dump()
    maintenance = save_to_db(db, MaintenanceModels, maintenance_data)
    return maintenance

@router.get("/{maintenance_id}", response_model=MaintenanceResponse)
def get_maintenance(maintenance_id: int, db: Session = Depends(get_db)):
    """
    Retrieve a specific maintenance record by ID.

    Args:
        maintenance_id (int): The ID of the maintenance record.
        db (Session): The database session.

    Returns:
        MaintenanceResponse: The maintenance record.
    """

    maintenance = db.query(MaintenanceModels).get(maintenance_id)
    return maintenance

@router.put("/{maintenance_id}", response_model=MaintenanceResponse)
def update_maintenance(maintenance_id: int, data: MaintenanceRequest, db: Session = Depends(get_db)):
    """
    Update a maintenance record by ID.

    Args:
        maintenance_id (int): The ID of the maintenance record to update.
        data (MaintenanceRequest): The updated maintenance data.
        db (Session): The database session.

    Returns:
        MaintenanceResponse: The updated maintenance record.
    """

    maintenance = db.query(MaintenanceModels).get(maintenance_id)
    for key, value in data.model_dump().items():
        setattr(maintenance, key, value)
    db.commit()
    db.refresh(maintenance)
    return maintenance

@router.delete("/{maintenance_id}", response_model=dict)
def delete_maintenance(maintenance_id: int, db: Session = Depends(get_db)):
    """
    Delete a maintenance record by ID.

    Args:
        maintenance_id (int): The ID of the maintenance record to delete.
        db (Session): The database session.

    Returns:
        dict: A confirmation message.
    """

    maintenance = db.query(MaintenanceModels).get(maintenance_id)
    db.delete(maintenance)
    db.commit()
    return {"message": "Maintenance deleted"}

@router.get("/machine/{machineId}", response_model=list[MaintenanceResponse])
def get_maintenances_by_machine(machineId: int, db: Session = Depends(get_db)):
    """
    Retrieve all maintenance records for a specific machine.

    Args:
        machineId (int): The ID of the machine.
        db (Session): The database session.

    Returns:
        list[MaintenanceResponse]: A list of maintenance records for the machine.
    """
    
    maintenances = db.query(MaintenanceModels).filter(MaintenanceModels.machine_id == machineId).all()
    return maintenances

@router.get("/team/{teamId}", response_model=list[MaintenanceResponse])
def get_maintenances_by_team(teamId: int, db: Session = Depends(get_db)):
    """
    Retrieve all maintenance records for a specific team.

    Args:
        teamId (int): The ID of the team.
        db (Session): The database session.

    Returns:
        list[MaintenanceResponse]: A list of maintenance records for the team.
    """

    maintenances = db.query(MaintenanceModels).filter(MaintenanceModels.team_id == teamId).all()
    return maintenances