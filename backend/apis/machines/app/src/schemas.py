from datetime import date
from pydantic import BaseModel, Field

class MachineRequest(BaseModel):
    """
    Schema for machine creation or update requests.

    Attributes:
        name (str): The name of the machine.
        type (str): The type or category of the machine.
        local (str): The location where the machine is situated.
        fabrication_date (date): The manufacturing date of the machine.
        serial_number (str): The unique serial number of the machine.
    """

    name: str
    type: str
    local: str
    fabrication_date: date
    serial_number: str

class MachineResponse(BaseModel):
    """
    Schema for machine responses.

    Attributes:
        id (int): The primary key of the machine.
        name (str): The name of the machine.
        type (str): The type or category of the machine.
        local (str): The location where the machine is situated.
        fabrication_date (date): The manufacturing date of the machine.
        serial_number (str): The unique serial number of the machine.
    """
    
    id: int
    name: str
    type: str
    local: str
    fabrication_date: date
    serial_number: str