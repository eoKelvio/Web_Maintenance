from fastapi import APIRouter

router = APIRouter(prefix="/teams")

@router.get("/")
def machine_response():
    return {"message": "Teams"}