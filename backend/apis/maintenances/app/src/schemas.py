from pydantic import BaseModel
from datetime import date

class MaintenanceRequest(BaseModel):
    """
    Schema for maintenance creation or update requests.

    Attributes:
        machine_id (int): The ID of the associated machine.
        date (date): The date of the maintenance activity.
        status (str): The status of the maintenance (e.g., completed, pending).
        description (str): A detailed description of the maintenance.
        priority (str): The priority level of the maintenance (e.g., high, medium, low).
        team_id (int): The ID of the team responsible for the maintenance.
    """

    machine_id: int
    date: date
    status: str
    description: str
    priority: str
    team_id: int

class MaintenanceResponse(BaseModel):
    """
    Schema for maintenance response.

    Attributes:
        id (int): The primary key of the maintenance record.
        machine_id (int): The ID of the associated machine.
        date (date): The date of the maintenance activity.
        status (str): The status of the maintenance (e.g., completed, pending).
        description (str): A detailed description of the maintenance.
        priority (str): The priority level of the maintenance (e.g., high, medium, low).
        team_id (int): The ID of the team responsible for the maintenance.
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
    Schema for used part creation or update requests.

    Attributes:
        part_id (int): The ID of the part used in the maintenance.
        quantity (int): The quantity of the part used.
    """

    part_id: int
    quantity: int

class UsedPartResponse(BaseModel):
    """
    Schema for used part response.

    Attributes:
        id (int): The primary key of the used part record.
        part_id (int): The ID of the part used in the maintenance.
        quantity (int): The quantity of the part used.
    """
    
    id: int
    part_id: int
    quantity: int