from pydantic import BaseModel
from typing import Optional
from .user import UserResponse

class JobBase(BaseModel):
    title: str
    description: str
    pay: float
    location: str

class JobCreate(JobBase):
    pass

class JobResponse(JobBase):
    id: int
    status: str
    posted_by: int
    poster: Optional[UserResponse] = None

    class Config:
        from_attributes = True
