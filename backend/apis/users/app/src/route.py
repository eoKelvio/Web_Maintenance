from fastapi import APIRouter

router = APIRouter(prefix="/users")

@router.get("/")
def users_response():
    return {"message": "Users"}