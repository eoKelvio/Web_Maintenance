from fastapi import APIRouter

router = APIRouter(prefix="/login")


@router.get("/")
def login_response():
    return {"message": "Login"}
