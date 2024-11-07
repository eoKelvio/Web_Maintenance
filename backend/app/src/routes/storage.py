from fastapi import APIRouter

router = APIRouter(prefix="/storage")

@router.get("/")
def machine_response():
    return {"message": "Storage"}