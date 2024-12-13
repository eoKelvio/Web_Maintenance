from pydantic import BaseModel, Field

class PartRequest(BaseModel):
    """
    Schema for part creation or update requests.

    Attributes:
        name (str): The name of the part.
        quantity (int): The available quantity of the part.
        cost (float): The cost of the part.
    """

    name: str
    quantity: int
    cost: float

class PartResponse(BaseModel):
    """
    Schema for part responses.

    Attributes:
        id (int): The primary key of the part.
        name (str): The name of the part.
        quantity (int): The available quantity of the part.
        cost (float): The cost of the part.
    """

    id: int
    name: str
    quantity: int
    cost: float

class UsedPartRequest(BaseModel):
    """
    Schema for used part creation or update requests.

    Attributes:
        part_id (int): The ID of the part used in the maintenance.
        quantity (int): The quantity of the part used.
        cost (float): The cost of the used part.
    """

    part_id: int
    quantity: int
    cost: float

class UsedPartResponse(BaseModel):
    """
    Schema for used part responses.

    Attributes:
        id (int): The primary key of the used part record.
        part_id (int): The ID of the part used in the maintenance.
        quantity (int): The quantity of the part used.
        cost (float): The cost of the used part.
    """
    
    id: int
    part_id: int
    quantity: int
    cost: float