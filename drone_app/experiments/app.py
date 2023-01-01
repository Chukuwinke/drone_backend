from connect import Connect
from connectServer import SocketDroneToserver




if __name__ == '__main__':
    drone = Connect('udpin:localhost:14551')
    connection = SocketDroneToserver('http://localhost:3000', {'token': 'my-token'}, drone)
    connection.start()
    #sio.connect('http://localhost:3000', auth={'token': 'my-token'})
    #sio.wait()


