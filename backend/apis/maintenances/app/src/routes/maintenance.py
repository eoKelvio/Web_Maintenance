from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.exc import SQLAlchemyError
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
        db (Session): Active database session, provided by dependency injection.

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
        data (MaintenanceRequest): Data for the new maintenance record.
        db (Session): Active database session, provided by dependency injection.

    Returns:
        MaintenanceResponse: The newly created maintenance record.

    Raises:
        HTTPException: If an error occurs while saving to the database.
    """

    try:
        maintenance_data = data.model_dump()
        maintenance = save_to_db(db, MaintenanceModels, maintenance_data)
        return maintenance
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error saving to database: {str(e)}")
    
@router.get("/{maintenance_id}", response_model=MaintenanceResponse)
def get_maintenance(maintenance_id: int, db: Session = Depends(get_db)):
    """
    Retrieve a maintenance record by its ID.

    Args:
        maintenance_id (int): ID of the maintenance record to retrieve.
        db (Session): Active database session, provided by dependency injection.

    Returns:
        MaintenanceResponse: The maintenance record with the given ID.

    Raises:
        HTTPException: If the maintenance record is not found.
    """

    maintenance = db.query(MaintenanceModels).get(maintenance_id)
    if maintenance is None:
        raise HTTPException(status_code=404, detail="Maintenance not found")
    return maintenance

@router.put("/{maintenance_id}", response_model=MaintenanceResponse)
def update_maintenance(maintenance_id: int, data: MaintenanceRequest, db: Session = Depends(get_db)):
    """
    Update an existing maintenance record.

    Args:
        maintenance_id (int): ID of the maintenance record to update.
        data (MaintenanceRequest): Updated data for the maintenance record.
        db (Session): Active database session, provided by dependency injection.

    Returns:
        MaintenanceResponse: The updated maintenance record.

    Raises:
        HTTPException: If the maintenance record is not found or if an error occurs while updating.
    """

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
    """
    Delete a maintenance record by its ID.

    Args:
        maintenance_id (int): ID of the maintenance record to delete.
        db (Session): Active database session, provided by dependency injection.

    Returns:
        dict: A confirmation message indicating successful deletion.

    Raises:
        HTTPException: If the maintenance record is not found or if an error occurs while deleting.
    """
    
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
    """
    Retrieve all maintenance records associated with a specific machine.

    Args:
        machineId (int): ID of the machine to filter maintenance records by.
        db (Session): Active database session, provided by dependency injection.

    Returns:
        list[MaintenanceResponse]: A list of maintenance records for the specified machine.
    """
    maintenances = db.query(MaintenanceModels).filter(MaintenanceModels.machine_id == machineId).all()
    return maintenances

@router.get("/team/{teamId}", response_model=list[MaintenanceResponse])
def get_maintenances_by_team(teamId: int, db: Session = Depends(get_db)):
    """
    Retrieve all maintenance records associated with a specific team.

    Args:
        teamId (int): ID of the team to filter maintenance records by.
        db (Session): Active database session, provided by dependency injection.

    Returns:
        list[MaintenanceResponse]: A list of maintenance records for the specified team.
    """
    
    maintenances = db.query(MaintenanceModels).filter(MaintenanceModels.team_id == teamId).all()
    return maintenances

