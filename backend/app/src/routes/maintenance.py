from fastapi import APIRouter

router = APIRouter(prefix="/maintenance")

@router.get("/")
def maintenance_response():
    return {"message": "Maintenance"}

