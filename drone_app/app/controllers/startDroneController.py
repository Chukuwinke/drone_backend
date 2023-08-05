import asyncio
from app.services import runDrone, connectDroneSocket


async def launchDrone(launchData):
    # to further deconstruct use A, B = launchData.values()
    try:
        missionKey = launchData.missionKey
        print("drone starting")
        drone = runDrone()
        connectDroneSocket(drone, missionKey)
        print("drone connected")
        
    except Exception as e:
        print(f"An error occurred: {e}")
        