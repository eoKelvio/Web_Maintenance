from fastapi import APIRouter

router = APIRouter(prefix="/storage")

@router.get("/")
def storage_response():
    return {"message": "Storage"}