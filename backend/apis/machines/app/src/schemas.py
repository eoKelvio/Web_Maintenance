from datetime import date
from pydantic import BaseModel, Field

class MachineRequest(BaseModel):
    name: str
    type: str
    local: str
    fabrication_date: date
    serial_number: str

class MachineResponse(BaseModel):
    id: int
    name: str
    type: str
    local: str
    fabrication_date: date
    serial_number: str