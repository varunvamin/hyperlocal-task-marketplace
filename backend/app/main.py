from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routers import auth, users, jobs

# Create the database tables if they don't exist
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="JobLeno API",
    description="Hyperlocal micro-job marketplace",
    version="1.0.0"
)

# Setup CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Update this to your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(users.router)
app.include_router(jobs.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the JobLeno API"}
