from .drone import Connect 
from app.sockets import runSocket

def runDrone():
    #USED THE IP ADDRESS OF THE CURRENT CONTAINER 172.17.0.3
    print("udpin:172.17.0.3:14551")
    
    drone = Connect('udpin:172.17.0.3:14551')
    print("udpin:172.17.0.2:14551 end!")
    return drone

def connectDroneSocket(drone, missionKey):
    runSocket(drone, missionKey)