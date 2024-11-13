from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from .database import save_to_db, get_db
from .models import UserModels
from .schemas import UserRequest

router = APIRouter(prefix="/users")

@router.get("/")
async def get_all_users(db: Session = Depends(get_db)):
    users = db.query(UserModels).all()
    return [user.model_dump() for user in users]

@router.post("/")
async def create_user(data: UserRequest, db: Session = Depends(get_db)):
    user = save_to_db(db, UserModels, data)
    return user.model_dump()

@router.get("/{user_id}")
async def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(UserModels).get(user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user.model_dump()

@router.put("/{user_id}")
async def update_user(user_id: int, data: UserRequest, db: Session = Depends(get_db)):
    user = db.query(UserModels).get(user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    for key, value in data.model_dump().items():
        setattr(user, key, value)
    db.commit()
    db.refresh(user)
    return user.model_dump()

@router.delete("/{user_id}")
async def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(UserModels).get(user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(user)
    db.commit()
    return {"message": "User deleted"}
