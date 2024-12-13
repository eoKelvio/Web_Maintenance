from datetime import date
from pydantic import BaseModel

class AuthRequest(BaseModel):
    """
    Schema for authentication request.

    Attributes:
        username (str): The username for authentication.
        password (str): The password for authentication.
    """

    username: str
    password: str

class AuthResponse(BaseModel):
    """
    Schema for authentication response.

    Attributes:
        token (str): The token issued upon successful authentication.
    """
    
    token: str