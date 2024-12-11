from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from .database import get_db, save_to_db
from .models import PartModels 
from .schemas import PartRequest, PartResponse

router = APIRouter(prefix="/parts")


@router.post("/", response_model=PartResponse)
async def create_part(data: PartRequest, db: Session = Depends(get_db)):
    """
    Create a new part in the inventory.

    Args:
        data (PartRequest): Data for the part to be created.
        db (Session): Active database session, provided by dependency injection.

    Returns:
        PartResponse: The newly created part.

    Raises:
        HTTPException: If the part name already exists or a database error occurs.
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
    Retrieve a part by its ID.

    Args:
        part_id (int): ID of the part to retrieve.
        db (Session): Active database session, provided by dependency injection.

    Returns:
        PartModels: The part with the specified ID.

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
    Update an existing part in the inventory.

    Args:
        part_id (int): ID of the part to update.
        data (PartRequest): Updated data for the part.
        db (Session): Active database session, provided by dependency injection.

    Returns:
        PartResponse: The updated part.

    Raises:
        HTTPException: If the part is not found, the name already exists, or a database error occurs.
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