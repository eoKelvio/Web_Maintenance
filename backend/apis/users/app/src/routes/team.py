from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from sqlalchemy.orm import Session

from ..database import get_db, save_to_db
from ..models.team import TeamModels
from ..models.user import UserModels
from ..schemas import TeamRequest, TeamResponse

router = APIRouter(prefix="/Teams")


@router.get("/", response_model=list[TeamResponse])
async def get_all_Teams(db: Session = Depends(get_db)):
    """
    Retrieve all teams from the database.

    Args:
        db (Session): Active database session, provided by dependency injection.

    Returns:
        list[TeamResponse]: A list of all teams in the database.
    """

    Teams = db.query(TeamModels).all()
    return Teams


@router.post("/", response_model=TeamResponse)
async def create_team(data: TeamRequest, db: Session = Depends(get_db)):
    """
    Create a new team in the database.

    Args:
        data (TeamRequest): The data for the team to be created.
        db (Session): Active database session, provided by dependency injection.

    Returns:
        TeamResponse: The newly created team.

    Raises:
        HTTPException: If the team name already exists or if the leader does not exist.
    """

    # Verifica se já existe um time com o mesmo nome
    existing_team = db.query(TeamModels).filter(TeamModels.name == data.name).first()
    if existing_team:
        raise HTTPException(status_code=409, detail="Name already exists")

    # Verifica se o líder existe
    leader = db.query(UserModels).filter(UserModels.id == data.leader_id).first()
    if not leader:
        raise HTTPException(status_code=404, detail="Leader ID does not exist")

    try:
        team_data = data.model_dump()
        team = save_to_db(db, TeamModels, team_data)
        return team

    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error saving to database: {str(e)}")


@router.get("/{Team_id}", response_model=TeamResponse)
async def get_Team(Team_id: int, db: Session = Depends(get_db)):
    """
    Retrieve a team by its ID.

    Args:
        Team_id (int): ID of the team to retrieve.
        db (Session): Active database session, provided by dependency injection.

    Returns:
        TeamResponse: The team with the given ID.

    Raises:
        HTTPException: If the team is not found.
    """
    
    Team = db.query(TeamModels).get(Team_id)
    if Team is None:
        raise HTTPException(status_code=404, detail="Team not found")
    return Team


@router.put("/{Team_id}", response_model=TeamResponse)
async def update_Team(Team_id: int, data: TeamRequest, db: Session = Depends(get_db)):
    """
    Update an existing team in the database.

    Args:
        Team_id (int): ID of the team to update.
        data (TeamRequest): The updated data for the team.
        db (Session): Active database session, provided by dependency injection.

    Returns:
        TeamResponse: The updated team.

    Raises:
        HTTPException: If the team is not found, the name already exists, or a database error occurs.
    """

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
    """
    Delete a team by its ID.

    Args:
        Team_id (int): ID of the team to delete.
        db (Session): Active database session, provided by dependency injection.

    Returns:
        dict: A confirmation message indicating successful deletion.

    Raises:
        HTTPException: If the team is not found or a database error occurs.
    """
    
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
