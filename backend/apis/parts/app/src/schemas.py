from pydantic import BaseModel, Field

class PartRequest(BaseModel):
    """
    Schema for incoming part data used in API requests.

    Attributes:
        name (str): Name of the part.
        quantity (int): Quantity of the part.
        cost (float): Cost of the part.
    """

    name: str
    quantity: int
    cost: float

class PartResponse(BaseModel):
    """
    Schema for part data used in API responses.

    Attributes:
        id (int): Unique identifier for the part.
        name (str): Name of the part.
        quantity (int): Quantity of the part.
        cost (float): Cost of the part.
    """

    id: int
    name: str
    quantity: int
    cost: float

class UsedPartRequest(BaseModel):
    """
    Schema for incoming data about parts used during maintenance.

    Attributes:
        part_id (int): ID of the part used.
        quantity (int): Quantity of the part used.
        cost (float): Cost associated with the used part.
    """

    part_id: int
    quantity: int
    cost: float

class UsedPartResponse(BaseModel):
    """
    Schema for part usage data used in API responses.

    Attributes:
        id (int): Unique identifier for the part usage record.
        part_id (int): ID of the part used.
        quantity (int): Quantity of the part used.
        cost (float): Cost associated with the used part.
    """
    
    id: int
    part_id: int
    quantity: int
    cost: float