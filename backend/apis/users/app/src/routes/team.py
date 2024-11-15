from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError, IntegrityError
from ..database import save_to_db, get_db
from ..models.team import TeamModels
from ..schemas import TeamRequest, TeamResponse

router = APIRouter(prefix="/Teams")

@router.get("/", response_model=list[TeamResponse])
async def get_all_Teams(db: Session = Depends(get_db)):
    Teams = db.query(TeamModels).all()
    return Teams

@router.post("/", response_model=TeamResponse)
async def create_Team(data: TeamRequest, db: Session = Depends(get_db)):
    existing_Team = db.query(TeamModels).filter(TeamModels.name == data.name).first()
    if existing_Team:
        raise HTTPException(status_code=409, detail="Name already exists")
    
    try:
        Team_data = data.model_dump()  
        Team = save_to_db(db, TeamModels, Team_data)
        return Team

    except IntegrityError as e:
        db.rollback()
        if "foreign key" in str(e.orig).lower():
            raise HTTPException(status_code=400, detail="Invalid leader_id: Referenced user does not exist")
        raise HTTPException(status_code=400, detail="Database integrity error")

    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error saving to database: {str(e)}")

@router.get("/{Team_id}", response_model=TeamResponse)
async def get_Team(Team_id: int, db: Session = Depends(get_db)):
    Team = db.query(TeamModels).get(Team_id)
    if Team is None:
        raise HTTPException(status_code=404, detail="Team not found")
    return Team

@router.put("/{Team_id}", response_model=TeamResponse)
async def update_Team(Team_id: int, data: TeamRequest, db: Session = Depends(get_db)):
    Team = db.query(TeamModels).get(Team_id)
    if Team is None:
        raise HTTPException(status_code=404, detail="Team not found")
    
    if data.name != Team.name:
        existing_Team = db.query(TeamModels).filter(TeamModels.name == data.name).first()
        if existing_Team:
            raise HTTPException(status_code=409, detail="Name already exists")
    
    try:
        for key, value in data.model_dump().items():
            setattr(Team, key, value)
        
        db.commit()
        db.refresh(Team)
        return Team

    except IntegrityError as e:
        db.rollback()
        if "foreign key" in str(e.orig).lower():
            raise HTTPException(status_code=400, detail="Invalid leader_id: Referenced user does not exist")
        raise HTTPException(status_code=400, detail="Database integrity error")

    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error updating Team: {str(e)}")

@router.delete("/{Team_id}", response_model=dict)
async def delete_Team(Team_id: int, db: Session = Depends(get_db)):
    Team = db.query(TeamModels).get(Team_id)
    if Team is None:
        raise HTTPException(status_code=404, detail="Team not found")
    
    try:
        db.delete(Team)
        db.commit()
        return {"message": "Team deleted"}
    
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error deleting Team: {str(e)}")