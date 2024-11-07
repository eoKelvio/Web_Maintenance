from fastapi import APIRouter

router = APIRouter(prefix="/teams")

@router.get("/")
def teams_response():
    return {"message": "Teams"}