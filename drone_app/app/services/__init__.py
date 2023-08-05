from .drone import Connect 
from app.sockets import runSocket

def runDrone():
    drone = Connect('udpin:localhost:14551')
    return drone

def connectDroneSocket(drone, missionKey):
    runSocket(drone, missionKey)