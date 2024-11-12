from fastapi import FastAPI, HTTPException
from src.database import db
from src.models import User

app = FastAPI()

@app.get("/users")
async def get_all_users():
    users = db.query(User).all()
    return [user.to_dict() for user in users]

@app.post("/users")
async def create_user(data: dict):
    new_user = User(
        name=data['name'],
        username=data['username'],
        password=data['password'],
        role=data['role'],
        team_id=data['team_id']
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user.to_dict()

@app.get("/users/{user_id}")
async def get_user(user_id: int):
    user = db.query(User).get(user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user.to_dict()

@app.put("/users/{user_id}")
async def update_user(user_id: int, data: dict):
    user = db.query(User).get(user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    user.name = data['name']
    user.username = data['username']
    user.password = data['password']
    user.role = data['role']
    user.team_id = data['team_id']
    db.commit()
    db.refresh(user)
    return user.to_dict()

@app.delete("/users/{user_id}")
async def delete_user(user_id: int):
    user = db.query(User).get(user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(user)
    db.commit()
    return {"message": "User deleted"}