from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import video
from .database import Database

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Events
@app.on_event("startup")
async def startup():
    await Database.connect_db()

@app.on_event("shutdown")
async def shutdown():
    await Database.close_db()

# Include routers
app.include_router(video.router, prefix="/api/video", tags=["video"]) 