from pydantic import BaseModel

class UserRequest(BaseModel):
    name: str
    username: str
    password: str
    role: str

# class UserResponse(BaseModel):
#     id: int
#     name: str
#     username: str
#     password: str
#     role: str
