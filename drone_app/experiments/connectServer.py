import socketio

class SocketDroneToserver:
    def __init__(self, url, header={}):
        self.sio = socketio.Client()
        self.url = url
        self.header = header
    
    def connectToServer(self):
        self.sio.connect(self.url, self.header)
        self.sio.wait()

    
    def connect(self):
        if self.sio.connected():
            print("connected")
    
    def events(self):
        
        self.connect()
        

