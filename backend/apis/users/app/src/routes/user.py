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
    user_data = data.model_dump()
    user = save_to_db(db, UserModels, user_data)
    return user


@router.get("/{user_id}", response_model=UserResponse)
async def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(UserModels).get(user_id)
    
    if not user:
        raise HTTPException(
            status_code=404,
            detail=f"user with ID {user_id} not found"
        )
    
    return user


@router.put("/{user_id}", response_model=UserResponse)
async def update_user(user_id: int, data: UserRequest, db: Session = Depends(get_db)):

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

    user = db.query(UserModels).get(user_id)

    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    
    db.delete(user)
    db.commit()

    return {"message": "User deleted successfully"}
