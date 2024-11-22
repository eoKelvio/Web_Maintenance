from pydantic import BaseModel, Field

class PartRequest(BaseModel):
    name: str
    quantity: int
    cost: float

class PartResponse(BaseModel):
    id: int
    name: str
    quantity: int
    cost: float

class UsedPartRequest(BaseModel):
    part_id: int
    quantity: int
    cost: float

class UsedPartResponse(BaseModel):
    id: int
    part_id: int
    quantity: int
    cost: float