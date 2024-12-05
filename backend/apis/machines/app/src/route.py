from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from .database import get_db, save_to_db
from .models import MachineModels
from .schemas import MachineRequest, MachineResponse

router = APIRouter(prefix="/machines")
"""
Router for managing machine-related API endpoints.
"""

@router.get("/")
def get_all_machines(db: Session = Depends(get_db)):
    """
    Retrieve all machines from the database.

    Args:
        db (Session): Active database session, provided by dependency injection.

    Returns:
        list: A list of all machines in the database.
    """

    machines = db.query(MachineModels).all()
    return machines

@router.post("/", response_model=MachineResponse)
def create_machine(data: MachineRequest, db: Session = Depends(get_db)):
    """
    Create a new machine in the database.

    Args:
        data (MachineRequest): The data for the machine to be created.
        db (Session): Active database session, provided by dependency injection.

    Returns:
        MachineResponse: The newly created machine.

    Raises:
        HTTPException: If the machine name already exists or if a database error occurs.
    """

    existing_machine = db.query(MachineModels).filter(MachineModels.name == data.name).first()
    if existing_machine:
        raise HTTPException(status_code=409, detail="Machine name already exists")

    try:
        machine_data = data.model_dump()
        machine = save_to_db(db, MachineModels, machine_data)
        return machine
    
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error saving to database: {str(e)}")
    
@router.get("/{machine_id}")
def get_machine(machine_id: int, db: Session = Depends(get_db)):
    """
    Retrieve a machine by its ID.

    Args:
        machine_id (int): The ID of the machine to retrieve.
        db (Session): Active database session, provided by dependency injection.

    Returns:
        MachineModels: The machine with the given ID.

    Raises:
        HTTPException: If the machine is not found.
    """

    machine = db.query(MachineModels).get(machine_id)
    if machine is None:
        raise HTTPException(status_code=404, detail="Machine not found")
    return machine

@router.put("/{machine_id}", response_model=MachineResponse)
def update_machine(machine_id: int, data: MachineRequest, db: Session = Depends(get_db)):
    """
    Update an existing machine.

    Args:
        machine_id (int): The ID of the machine to update.
        data (MachineRequest): The new data for the machine.
        db (Session): Active database session, provided by dependency injection.

    Returns:
        MachineResponse: The updated machine.

    Raises:
        HTTPException: If the machine is not found, the name already exists, or if a database error occurs.
    """

    machine = db.query(MachineModels).get(machine_id)
    if machine is None:
        raise HTTPException(status_code=404, detail="Machine not found")

    if data.name != machine.name:
        existing_machine = db.query(MachineModels).filter(MachineModels.name == data.name).first()
        if existing_machine:
            raise HTTPException(status_code=409, detail="Machine name already exists")

    try:
        for key, value in data.model_dump().items():
            setattr(machine, key, value)

        db.commit()
        db.refresh(machine)
        return machine

    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error updating machine: {str(e)}")
    
@router.delete("/{machine_id}", response_model=dict)
def delete_machine(machine_id: int, db: Session = Depends(get_db)):
    """
    Delete a machine by its ID.

    Args:
        machine_id (int): The ID of the machine to delete.
        db (Session): Active database session, provided by dependency injection.

    Returns:
        dict: A message confirming the deletion.

    Raises:
        HTTPException: If the machine is not found or if a database error occurs.
    """
    
    machine = db.query(MachineModels).get(machine_id)
    if machine is None:
        raise HTTPException(status_code=404, detail="Machine not found")

    try:
        db.delete(machine)
        db.commit()
        return {"message": "Machine deleted"}

    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error deleting machine: {str(e)}")