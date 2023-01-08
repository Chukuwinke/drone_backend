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
        def takeoffCommand(args):
            print("takeoff triggered")
            self.drone.takeoff()
            #self.drone.armToggle()
        
        @self.sio.event
        def toggleArmCommand(args):
            print("toggle triggered")
            #self.drone.takeoff()
            self.drone.armToggle()
        
        @self.sio.event
        def modeCommand(args):
            print("mode triggered")
            #self.drone.takeoff()
            self.drone.setMode()
        
        
    def loop(self):
        self.sio.wait()

    def start(self):
        self.connectToServer()
        self.loop()
        

