from pymavlink import mavutil
#import socketio
import json

#'udpin:localhost:14551'
class Connect:
    def __init__(self, device_udpin):
        self.master = mavutil.mavlink_connection(device_udpin)
        self.master.wait_heartbeat()
        self.target_sys = self.master.target_system
        self.target_comp = self.master.target_component
        self.armed = False
        self.mode = 'GUIDED'

        print(f"Heart beat from system {self.target_sys}, component {self.target_comp}")

    def get_drone_data(self, sio):
        '''
        Retreive telemetery data from drone and send to server
        '''
        while 1:
            msg = self.master.recv_match(type='ATTITUDE', blocking=True)
            data =msg.to_dict()
            #print(data)
            jData = json.dumps(data)
            sio.emit('data', jData)
            #print(jData)

    def armToggle(self):
        if self.armed:
            #arm command
            self.master.mav.command_long_send(self.master.target_system, self.master.target_component,
                                                mavutil.mavlink.MAV_CMD_COMPONENT_ARM_DISARM, 0, 0, 0, 0, 0, 0, 0, 0)
            
            self.master.motors_disarmed_wait()
            self.armed = False
        else:
            #arm command
            self.master.mav.command_long_send(self.master.target_system, self.master.target_component,
                                     mavutil.mavlink.MAV_CMD_COMPONENT_ARM_DISARM, 0, 1, 0, 0, 0, 0, 0, 0)
            # wait for the vehicle to be armed
            self.master.motors_armed_wait()
            self.armed = True
            
        msg = self.master.recv_match(type='COMMAND_ACK', blocking=True)
        print(msg)
    
    # setting the vehicle mode
    def setMode(self):
        mode_ID = self.master.mode_mapping()[self.mode]
        self.master.mav.set_mode_send(self.master.target_system, 
                                        mavutil.mavlink.MAV_MODE_FLAG_CUSTOM_MODE_ENABLED,
                                        mode_ID)


    def takeoff(self):

        #takeoff command
        self.master.mav.command_long_send(self.master.target_system, self.master.target_component,
                                            mavutil.mavlink.MAV_CMD_NAV_TAKEOFF, 0, 0, 0, 0, 0, 0, 0, 10)
        msg = self.master.recv_match(type='COMMAND_ACK', blocking=True)
        print(msg)

    def land(self):
        #land drone
        self.master.mav.command_long_send(self.master.target_system, self.master.target_component,
                                            mavutil.mavlink.MAV_CMD_NAV_LAND, 0,0,0,0,0,0,0,0)
        msg = self.master.recv_match(type="COMMAND_ACK", blocking=True)


# drone = Connect('udpin:localhost:14551')

#drone.get_drone_data()
# sio = socketio.Client()




# def send_drone_data():
#     '''
#         Retreive telemetery data from drone and send to server
#     '''
#     while 1:
#         msg = master.recv_match(type='ATTITUDE', blocking=True)
#         data =msg.to_dict()
#         jData = json.dumps(data)
#         print(jData)
#         sio.emit('data', jData)


# @sio.event
# def connect():
#     print('connected to server')
#     send_drone_data()


# @sio.event
# def disconnect():
#     print('disconnected from server')



# if __name__ == '__main__':
#     sio.connect('http://localhost:3000', auth={'token': 'my-token'})
#     sio.wait()
