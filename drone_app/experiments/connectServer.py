import socketio

class SocketDroneToserver:
    def __init__(self, url, header, drone):
        self.sio = socketio.Client()
        self.url = url
        self.header = header
        self.drone = drone
    
    def connectToServer(self):
        self.events()
        self.sio.connect(self.url, auth=self.header)

    
    def events(self):
        @self.sio.event
        def connect():
            print("connected")
            self.drone.get_drone_data(self.sio)
        
        @self.sio.event
        def disconnect():
            print("disconnected")
        
        @self.sio.event
        def takeoffcommand(args):
            print("triggered")
            #self.drone.takeoff()
            self.drone.armToggle()
        
        
    def loop(self):
        self.sio.wait()

    def start(self):
        self.connectToServer()
        self.loop()
        

