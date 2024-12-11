from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from ..database import get_db, save_to_db
from ..models.user import UserModels
from ..schemas import UserRequest, UserResponse

router = APIRouter(prefix="/users")


@router.get("/", response_model=list[UserResponse])
async def get_all_users(db: Session = Depends(get_db)):
    """
    Retrieve all users from the database.

    Args:
        db (Session): Active database session, provided by dependency injection.

    Returns:
        list[UserResponse]: A list of all users in the database.
    """

    users = db.query(UserModels).all()
    return users


@router.post("/", response_model=UserResponse)
async def create_user(data: UserRequest, db: Session = Depends(get_db)):
    """
    Create a new user in the database.

    Args:
        data (UserRequest): The data for the user to be created.
        db (Session): Active database session, provided by dependency injection.

    Returns:
        UserResponse: The newly created user.

    Raises:
        HTTPException: If the username already exists or a database error occurs.
    """

    existing_user = db.query(UserModels).filter(UserModels.username == data.username).first()
    if existing_user:
        raise HTTPException(status_code=409, detail="Username already exists")

    try:
        user_data = data.model_dump()
        user = save_to_db(db, UserModels, user_data)
        return user

    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error saving to database: {str(e)}")


@router.get("/{user_id}", response_model=UserResponse)
async def get_user(user_id: int, db: Session = Depends(get_db)):
    """
    Retrieve a user by their ID.

    Args:
        user_id (int): ID of the user to retrieve.
        db (Session): Active database session, provided by dependency injection.

    Returns:
        UserResponse: The user with the given ID.

    Raises:
        HTTPException: If the user is not found.
    """

    user = db.query(UserModels).get(user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.put("/{user_id}", response_model=UserResponse)
async def update_user(user_id: int, data: UserRequest, db: Session = Depends(get_db)):
    """
    Update an existing user in the database.

    Args:
        user_id (int): ID of the user to update.
        data (UserRequest): The updated data for the user.
        db (Session): Active database session, provided by dependency injection.

    Returns:
        UserResponse: The updated user.

    Raises:
        HTTPException: If the user is not found, the username already exists, or a database error occurs.
    """

    user = db.query(UserModels).get(user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    if data.username != user.username:
        existing_user = db.query(UserModels).filter(UserModels.username == data.username).first()
        if existing_user:
            raise HTTPException(status_code=409, detail="Username already exists")

    try:
        for key, value in data.model_dump().items():
            setattr(user, key, value)

        db.commit()
        db.refresh(user)
        return user

    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error updating user: {str(e)}")


@router.delete("/{user_id}", response_model=UserResponse)
async def delete_user(user_id: int, db: Session = Depends(get_db)):
    """
    Delete a user by their ID.

    Args:
        user_id (int): ID of the user to delete.
        db (Session): Active database session, provided by dependency injection.

    Returns:
        dict: A confirmation message indicating successful deletion.

    Raises:
        HTTPException: If the user is not found or a database error occurs.
    """
    
    user = db.query(UserModels).get(user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    try:
        db.delete(user)
        db.commit()
        return {"message": "User deleted"}

    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error deleting user: {str(e)}")
