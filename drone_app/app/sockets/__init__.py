from .socketConnection import SocketDroneToserver

def runSocket(drone, missionKey):
    connection = SocketDroneToserver('http://172.27.150.177:3000', {'token': 'my-token'}, drone)
    connection.connectToServer(missionKey)