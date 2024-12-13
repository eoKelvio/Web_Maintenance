from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from sqlalchemy.orm import Session

from ..database import get_db, save_to_db
from ..models.team import TeamModels
from ..schemas import TeamRequest, TeamResponse

router = APIRouter(prefix="/teams")


@router.get("/", response_model=list[TeamResponse])
async def get_all_Teams(db: Session = Depends(get_db)):
    """
    Retrieve all teams from the database.

    Args:
        db (Session): The database session.

    Returns:
        list[TeamResponse]: A list of all team records.
    """

    teams = db.query(TeamModels).all()
    return teams


@router.post("/", response_model=TeamResponse)
async def create_team(data: TeamRequest, db: Session = Depends(get_db)):
    """
    Create a new team record in the database.

    Args:
        data (TeamRequest): The team data to create.
        db (Session): The database session.

    Returns:
        TeamResponse: The created team object.
    """

    team_data = data.model_dump()  # Ajuste se você não estiver usando Pydantic v2
    team = save_to_db(db, TeamModels, team_data)
    return team


@router.get("/{team_id}", response_model=TeamResponse)
async def get_Team(team_id: int, db: Session = Depends(get_db)):
    """
    Retrieve a specific team by ID.

    Args:
        team_id (int): The ID of the team to retrieve.
        db (Session): The database session.

    Returns:
        TeamResponse: The team record.

    Raises:
        HTTPException: If the team is not found.
    """

    team = db.query(TeamModels).get(team_id)
    
    if not team:
        raise HTTPException(
            status_code=404,
            detail=f"Team with ID {team_id} not found"
        )
    
    return team


@router.put("/{team_id}", response_model=TeamResponse)
async def update_team(team_id: int, data: TeamRequest, db: Session = Depends(get_db)):
    """
    Update a team record by ID.

    Args:
        team_id (int): The ID of the team to update.
        data (TeamRequest): The updated team data.
        db (Session): The database session.

    Returns:
        TeamResponse: The updated team object.

    Raises:
        HTTPException: If the team is not found or if a database error occurs.
    """

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
    """
    Delete a team record by ID.

    Args:
        team_id (int): The ID of the team to delete.
        db (Session): The database session.

    Returns:
        dict: A message indicating the deletion status.

    Raises:
        HTTPException: If the team is not found or an error occurs during deletion.
    """
    
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
