from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.orm import relationship
from ..database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    password_hash = Column(String)
    role = Column(String, default="user") # 'user' or 'admin'
    trust_score = Column(Float, default=5.0)

    jobs_posted = relationship("Job", back_populates="poster")
    applications = relationship("Application", back_populates="applicant")
