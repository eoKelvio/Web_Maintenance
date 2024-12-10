from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from sqlalchemy.orm import Session

from ..database import get_db, save_to_db
from ..models.team import TeamModels
from ..schemas import TeamRequest, TeamResponse

router = APIRouter(prefix="/teams")


@router.get("/", response_model=list[TeamResponse])
async def get_all_Teams(db: Session = Depends(get_db)):
    teams = db.query(TeamModels).all()
    return teams


@router.post("/", response_model=TeamResponse)
async def create_team(data: TeamRequest, db: Session = Depends(get_db)):
    team_data = data.model_dump()  # Ajuste se você não estiver usando Pydantic v2
    team = save_to_db(db, TeamModels, team_data)
    return team


@router.get("/{team_id}", response_model=TeamResponse)
async def get_Team(team_id: int, db: Session = Depends(get_db)):
    team = db.query(TeamModels).get(team_id)
    
    if not team:
        raise HTTPException(
            status_code=404,
            detail=f"Team with ID {team_id} not found"
        )
    
    return team


@router.put("/{team_id}", response_model=TeamResponse)
async def update_team(team_id: int, data: TeamRequest, db: Session = Depends(get_db)):
    team = db.query(TeamModels).get(team_id)
    if team is None:
        raise HTTPException(status_code=404, detail="Team not found")

    if data.name != team.name:
        existing_team = db.query(TeamModels).filter(TeamModels.name == data.name).first()
        if existing_team:
            raise HTTPException(status_code=409, detail="Name already exists")

    try:
        for key, value in data.model_dump().items():
            setattr(team, key, value)

        db.commit()
        db.refresh(team)
        return team

    except IntegrityError as e:
        db.rollback()
        if "foreign key" in str(e.orig).lower():
            raise HTTPException(status_code=400, detail="Invalid leader_id: Referenced user does not exist")
        raise HTTPException(status_code=400, detail="Database integrity error")

    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error updating Team: {str(e)}")


@router.delete("/{team_id}", response_model=dict)
async def delete_Team(team_id: int, db: Session = Depends(get_db)):
    team = db.query(TeamModels).get(team_id)
    if team is None:
        raise HTTPException(status_code=404, detail="Team not found")

    try:
        db.delete(team)
        db.commit()
        return {"message": "Team deleted"}

    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error deleting Team: {str(e)}")
