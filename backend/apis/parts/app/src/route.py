from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from .database import get_db, save_to_db
from .models import PartModels 
from .schemas import PartRequest, PartResponse

router = APIRouter(prefix="/parts")

@router.get("/", response_model=list[PartResponse])
async def get_all_parts(db: Session = Depends(get_db)):
    """
    Retrieve all parts from the database.

    Args:
        db (Session): The database session.

    Returns:
        list[PartResponse]: A list of all parts.
    """

    parts = db.query(PartModels).all()
    return parts

@router.post("/", response_model=PartResponse)
async def create_part(data: PartRequest, db: Session = Depends(get_db)):
    """
    Create a new part record in the database.

    Args:
        data (PartRequest): The part data to create.
        db (Session): The database session.

    Returns:
        PartResponse: The created part object.

    Raises:
        HTTPException: If the part name already exists or an error occurs.
    """
    existing_part = db.query(PartModels).filter(PartModels.name == data.name).first()
    if existing_part:
        raise HTTPException(status_code=409, detail="Part name already exists")

    try:
        part_data = data.model_dump()
        part = save_to_db(db, PartModels, part_data)
        return part

    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error saving to database: {str(e)}")
        
@router.get("/{part_id}")
def get_part(part_id: int, db: Session = Depends(get_db)):
    """
    Retrieve a specific part by ID.

    Args:
        part_id (int): The ID of the part to retrieve.
        db (Session): The database session.

    Returns:
        PartModels: The part record.

    Raises:
        HTTPException: If the part is not found.
    """

    part = db.query(PartModels).get(part_id)
    if part is None:
        raise HTTPException(status_code=404, detail="Part not found")
    return part

@router.put("/{part_id}", response_model=PartResponse)
def update_part(part_id: int, data: PartRequest, db: Session = Depends(get_db)):
    """
    Update a part record by ID.

    Args:
        part_id (int): The ID of the part to update.
        data (PartRequest): The updated part data.
        db (Session): The database session.

    Returns:
        PartResponse: The updated part object.

    Raises:
        HTTPException: If the part is not found or the name already exists.
    """

    part = db.query(PartModels).get(part_id)
    if part is None:
        raise HTTPException(status_code=404, detail="Part not found")

    if data.name != part.name:
        existing_part = db.query(PartModels).filter(PartModels.name == data.name).first()
        if existing_part:
            raise HTTPException(status_code=409, detail="Part name already exists")

    try:
        for key, value in data.model_dump().items():
            setattr(part, key, value)

        db.commit()
        db.refresh(part)
        return part

    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error updating part: {str(e)}")

@router.delete("/{part_id}", response_model=dict)
async def delete_part(part_id: int, db: Session = Depends(get_db)):
    """
    Delete a part record by ID.

    Args:
        part_id (int): The ID of the part to delete.
        db (Session): The database session.

    Returns:
        dict: A message indicating the deletion status.

    Raises:
        HTTPException: If the part is not found or an error occurs during deletion.
    """
    
    part = db.query(PartModels).get(part_id)
    if part is None:
        raise HTTPException(status_code=404, detail="Part not found")

    try:
        db.delete(part)
        db.commit()
        return {"message": "Part deleted successfully"}

    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error deleting part: {str(e)}")