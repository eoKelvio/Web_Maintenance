from datetime import date
from pydantic import BaseModel, Field

class MachineRequest(BaseModel):
    """
    Schema for incoming machine data used in API requests.

    Attributes:
        name (str): The name of the machine.
        type (str): The type of the machine.
        local (str): The location where the machine is installed or used.
        fabrication_date (date): The date the machine was fabricated.
        serial_number (str): The unique serial number of the machine.
    """

    name: str
    type: str
    local: str
    fabrication_date: date
    serial_number: str

class MachineResponse(BaseModel):
    """
    Schema for machine data used in API responses.

    Attributes:
        id (int): The unique identifier of the machine.
        name (str): The name of the machine.
        type (str): The type of the machine.
        local (str): The location where the machine is installed or used.
        fabrication_date (date): The date the machine was fabricated.
        serial_number (str): The unique serial number of the machine.
    """

    id: int
    name: str
    type: str
    local: str
    fabrication_date: date
    serial_number: str