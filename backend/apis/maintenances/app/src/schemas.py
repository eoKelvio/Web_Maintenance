from pydantic import BaseModel
from datetime import date

class MaintenanceRequest(BaseModel):
    """
    Schema for incoming maintenance data used in API requests.

    Attributes:
        machine_id (int): ID of the machine associated with the maintenance.
        date (date): Date when the maintenance occurred.
        status (str): Status of the maintenance task.
        description (str): Description of the maintenance activity.
        priority (str): Priority level of the maintenance.
        team_id (int): ID of the team responsible for the maintenance.
    """

    machine_id: int
    date: date
    status: str
    description: str
    priority: str
    team_id: int

class MaintenanceResponse(BaseModel):
    """
    Schema for maintenance data used in API responses.

    Attributes:
        id (int): Unique identifier for the maintenance record.
        machine_id (int): ID of the machine associated with the maintenance.
        date (date): Date when the maintenance occurred.
        status (str): Status of the maintenance task.
        description (str): Description of the maintenance activity.
        priority (str): Priority level of the maintenance.
        team_id (int): ID of the team responsible for the maintenance.
    """

    id: int
    machine_id: int
    date: date
    status: str
    description: str
    priority: str
    team_id: int

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