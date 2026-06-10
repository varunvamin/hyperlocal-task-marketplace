from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..models.job import Job
from ..models.user import User
from ..schemas.job import JobCreate, JobResponse
from .users import get_current_user

router = APIRouter(
    prefix="/jobs",
    tags=["Jobs"]
)

@router.get("/", response_model=List[JobResponse])
def get_jobs(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    jobs = db.query(Job).offset(skip).limit(limit).all()
    return jobs

@router.post("/", response_model=JobResponse)
def create_job(job_in: JobCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    new_job = Job(
        title=job_in.title,
        description=job_in.description,
        pay=job_in.pay,
        location=job_in.location,
        posted_by=current_user.id
    )
    db.add(new_job)
    db.commit()
    db.refresh(new_job)
    return new_job

@router.get("/{job_id}", response_model=JobResponse)
def get_job(job_id: int, db: Session = Depends(get_db)):
    job = db.query(Job).filter(Job.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job
