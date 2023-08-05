# app/routes/user.py

from fastapi import APIRouter
from app.controllers import launchDrone
from app.models import LaunchData
# Create a new router for user routes
router = APIRouter()

# Define routes using the `router` instance
@router.post("/api/bind")
async def read_user(launchData: LaunchData):
    await launchDrone(launchData)
