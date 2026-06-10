from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from ..database import Base

class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String)
    pay = Column(Float)
    location = Column(String)
    status = Column(String, default="open") # 'open', 'in_progress', 'completed'
    posted_by = Column(Integer, ForeignKey("users.id"))

    poster = relationship("User", back_populates="jobs_posted")
    applications = relationship("Application", back_populates="job")
