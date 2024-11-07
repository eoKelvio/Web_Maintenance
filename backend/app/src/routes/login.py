from fastapi import APIRouter

router = APIRouter(prefix="/login")

@router.get("/")
def machine_response():
    return {"message": "Login"}