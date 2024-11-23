from pydantic import BaseModel
from datetime import date

class MaintenanceRequest(BaseModel):
    machine_id: int
    date: date
    status: str
    description: str
    priority: str
    team_id: int

class MaintenanceResponse(BaseModel):
    id: int
    machine_id: int
    date: date
    status: str
    description: str
    priority: str
    team_id: int

class UsedPartRequest(BaseModel):
    part_id: int
    quantity: int
    cost: float

class UsedPartResponse(BaseModel):
    id: int
    part_id: int
    quantity: int
    cost: float