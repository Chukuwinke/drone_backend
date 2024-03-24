import asyncio
from app.services import runDrone, connectDroneSocket
from experiments.mavpyLaunch import run_mavproxy


async def launchDrone(launchData):
    # to further deconstruct use A, B = launchData.values()
    try:
        #ADD ANOTHER LAYER OF SECURITY LIKE AN DECRYPTION OF MISSION KEY BEFORE EVEN RUNNING MAVPROXY!! 
        missionKey = launchData.missionKey
        print("mavproxy starting")
        data = await run_mavproxy()
        print(data)
        print("mavproxy ending")
        print("drone starting")
        drone = runDrone()
        print("drone ran!")
        print("socket connected!")
        #PROBLEM START
        connectDroneSocket(drone, missionKey)
        print("drone connected")
        
    except Exception as e:
        print(f"An error occurred: {e}")
        