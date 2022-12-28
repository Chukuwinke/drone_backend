from pymavlink import mavutil
import socketio
import json

master = mavutil.mavlink_connection('udpin:localhost:14551')

sio = socketio.Client()

master.wait_heartbeat()

print(f"Heart beat from system {master.target_system}, component {master.target_component}")


def send_drone_data():
    '''
        Retreive telemetery data from drone and send to server
    '''
    while 1:
        msg = master.recv_match(type='ATTITUDE', blocking=True)
        data =msg.to_dict()
        jData = json.dumps(data)
        print(jData)
        sio.emit('data', jData)


@sio.event
def connect():
    print('connected to server')
    send_drone_data()


@sio.event
def disconnect():
    print('disconnected from server')



if __name__ == '__main__':
    sio.connect('http://localhost:3000', auth={'token': 'my-token'})
    sio.wait()
