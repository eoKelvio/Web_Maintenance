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
        db (Session): The database session.

    Returns:
        list[UserResponse]: A list of all user records.
    """

    users = db.query(UserModels).all()
    return users


@router.post("/", response_model=UserResponse)
async def create_user(data: UserRequest, db: Session = Depends(get_db)):
    """
    Create a new user record in the database.

    Args:
        data (UserRequest): The user data to create.
        db (Session): The database session.

    Returns:
        UserResponse: The created user object.
    """

    user_data = data.model_dump()
    user = save_to_db(db, UserModels, user_data)
    return user


@router.get("/{user_id}", response_model=UserResponse)
async def get_user(user_id: int, db: Session = Depends(get_db)):
    """
    Retrieve a specific user by ID.

    Args:
        user_id (int): The ID of the user to retrieve.
        db (Session): The database session.

    Returns:
        UserResponse: The user record.

    Raises:
        HTTPException: If the user is not found.
    """

    user = db.query(UserModels).get(user_id)
    
    if not user:
        raise HTTPException(
            status_code=404,
            detail=f"user with ID {user_id} not found"
        )
    
    return user


@router.put("/{user_id}", response_model=UserResponse)
async def update_user(user_id: int, data: UserRequest, db: Session = Depends(get_db)):
    """
    Update a user record by ID.

    Args:
        user_id (int): The ID of the user to update.
        data (UserRequest): The updated user data.
        db (Session): The database session.

    Returns:
        UserResponse: The updated user object.

    Raises:
        HTTPException: If the user is not found.
    """

    user = db.query(UserModels).get(user_id)

    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    for key, value in data.model_dump().items():
        setattr(user, key, value)
    db.commit()
    db.refresh(user)
    return user


from fastapi import HTTPException, status

@router.delete("/{user_id}")
async def delete_user(user_id: int, db: Session = Depends(get_db)):
    """
    Delete a user record by ID.

    Args:
        user_id (int): The ID of the user to delete.
        db (Session): The database session.

    Returns:
        dict: A message indicating the deletion status.

    Raises:
        HTTPException: If the user is not found.
    """

    user = db.query(UserModels).get(user_id)

    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    
    db.delete(user)
    db.commit()

    return {"message": "User deleted successfully"}
