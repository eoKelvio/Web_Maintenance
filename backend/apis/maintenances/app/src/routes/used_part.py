from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from ..database import get_db, save_to_db
from ..models.used_part import UsedPartModels 
from ..schemas import  UsedPartRequest, UsedPartResponse

router = APIRouter(prefix="/{maintenance_id}/used_parts")

@router.get("/", response_model=list[UsedPartResponse])
def get_used_parts(maintenance_id: int, db: Session = Depends(get_db)):
    """
    Retrieve all used parts for a specific maintenance task.

    Args:
        maintenance_id (int): ID of the maintenance task.
        db (Session): Active database session, provided by dependency injection.

    Returns:
        list[UsedPartResponse]: A list of used parts associated with the maintenance task.
    """

    used_parts = db.query(UsedPartModels).filter(UsedPartModels.maintenance_id == maintenance_id).all()
    return used_parts

@router.post("/", response_model=UsedPartResponse)
def create_used_part(data: UsedPartRequest, db: Session = Depends(get_db)):
    """
    Create a new record for a part used during maintenance.

    Args:
        data (UsedPartRequest): Data for the used part.
        db (Session): Active database session, provided by dependency injection.

    Returns:
        UsedPartResponse: The newly created used part record.

    Raises:
        HTTPException: If an error occurs while saving to the database.
    """

    try:
        used_part_data = data.model_dump()
        used_part = save_to_db(db, UsedPartModels, used_part_data)
        return used_part

    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error saving to database: {str(e)}")
    
@router.put("/{used_part_id}", response_model=UsedPartResponse)
def update_used_part(used_part_id: int, data: UsedPartRequest, db: Session = Depends(get_db)):
    """
    Update an existing record for a part used during maintenance.

    Args:
        used_part_id (int): ID of the used part record to update.
        data (UsedPartRequest): Updated data for the used part.
        db (Session): Active database session, provided by dependency injection.

    Returns:
        UsedPartResponse: The updated used part record.

    Raises:
        HTTPException: If the used part record is not found or if an error occurs while updating.
    """

    used_part = db.query(UsedPartModels).get(used_part_id)
    if used_part is None:
        raise HTTPException(status_code=404, detail="Used part not found")

    try:
        for key, value in data.model_dump().items():
            setattr(used_part, key, value)

        db.commit()
        db.refresh(used_part)
        return used_part

    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error updating used part: {str(e)}")
    
@router.delete("/{used_part_id}", response_model=dict)
def delete_used_part(used_part_id: int, db: Session = Depends(get_db)):
    """
    Delete a record of a part used during maintenance.

    Args:
        used_part_id (int): ID of the used part record to delete.
        db (Session): Active database session, provided by dependency injection.

    Returns:
        dict: A confirmation message indicating successful deletion.

    Raises:
        HTTPException: If the used part record is not found or if an error occurs while deleting.
    """
    
    used_part = db.query(UsedPartModels).get(used_part_id)
    if used_part is None:
        raise HTTPException(status_code=404, detail="Used part not found")

    try:
        db.delete(used_part)
        db.commit()
        return {"message": "Used part deleted"}

    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error deleting used part: {str(e)}")