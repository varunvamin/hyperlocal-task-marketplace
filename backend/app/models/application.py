from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from ..database import Base

class Application(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True, index=True)
    job_id = Column(Integer, ForeignKey("jobs.id"))
    worker_id = Column(Integer, ForeignKey("users.id"))
    status = Column(String, default="pending") # 'pending', 'accepted', 'rejected'

    job = relationship("Job", back_populates="applications")
    applicant = relationship("User", back_populates="applications")
