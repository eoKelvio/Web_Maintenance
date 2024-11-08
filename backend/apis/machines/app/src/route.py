from fastapi import APIRouter

router = APIRouter(prefix="/machines")

@router.get("/")
def machine_response():
    return {"message": "Machines"}

