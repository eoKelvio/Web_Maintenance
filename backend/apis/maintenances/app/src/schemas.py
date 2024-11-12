from pydantic import BaseModel
from datetime import date
from typing import Optional

class MaintenanceBase(BaseModel):
    date: date
    status: str
    description: str
    priority: str

class MaintenanceCreate(MaintenanceBase):
    machine_id: int
    user_id: int

class MaintenanceUpdate(MaintenanceBase):
    pass

class Maintenance(MaintenanceBase):
    id: int
    machine_id: int
    user_id: int

    class Config:
        orm_mode = True