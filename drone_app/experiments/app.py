from connect import Connect
from connectServer import SocketDroneToserver

# step 1  start the drone and connect to it
# step 2 listen for connection to the server
# step 3 get authenticated user token from the server and start drone control session

#there are to users of the service the drone and the web-client
#both will be connected and comunicate through a server using a socket io session
#


if __name__ == '__main__':
    drone = Connect('udpin:localhost:14551')
    connection = SocketDroneToserver('http://localhost:3000', {'token': 'my-token'}, drone)
    connection.start()
    #sio.connect('http://localhost:3000', auth={'token': 'my-token'})
    #sio.wait()


