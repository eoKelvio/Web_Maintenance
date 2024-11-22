from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from ..database import get_db, save_to_db
from ..models.user import UserModels
from ..schemas import UserRequest, UserResponse

router = APIRouter(prefix="/users")


@router.get("/", response_model=list[UserResponse])
async def get_all_users(db: Session = Depends(get_db)):
    users = db.query(UserModels).all()
    return users


@router.post("/", response_model=UserResponse)
async def create_user(data: UserRequest, db: Session = Depends(get_db)):
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
    user = db.query(UserModels).get(user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.put("/{user_id}", response_model=UserResponse)
async def update_user(user_id: int, data: UserRequest, db: Session = Depends(get_db)):
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
