from .socketConnection import SocketDroneToserver

def runSocket(drone, missionKey):
    connection = SocketDroneToserver('http://localhost:3000', {'token': 'my-token'}, drone)
    connection.connectToServer(missionKey)