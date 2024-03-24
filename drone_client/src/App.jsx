import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';


import { io } from "socket.io-client";
const socket = io('http://localhost:3000', {
  reconnection: true,
  reconnectionAttempts: 2,
  reconnectionDelay: 1000,
  })
const loggedIn = true;


function App() {
  //const socket = io('http://localhost:3000')
  const [roomId, setRoomId] = useState('');
  const [telemData, setTelemData] = useState(0)
  const [isConnected, setIsConnected] = useState(socket.connected);

  const setMode = () => {
    socket.emit('setMode', 'setMode')
  }
  const takeOffMode = () => {
    socket.emit('takeoff', 'takeoff')
  }
  const landMode = () => {
    socket.emit('takeoff', 'takeoff')
  }
  const toggleArm = () => {
    socket.emit('toggleArm', 'toggleArm')
  }

  const simulateDisconnect = () => {

    socket.disconnect();
    console.log(`${socket.id} has disconnected`)
  }

  useEffect(() =>{
    // FUCTIONALITY MANIPULATE CONNECTION
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onTelem(data) {
      setTelemData(data);
    }
    // FUCTIONALITY MANIPULATE CONNECTION


    // Try using a if statement to check a condition 
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('telem', onTelem);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('telem', onTelem)
    }
  }, [])

  console.log(isConnected)
  console.log(socket.id)
  const joinRoom = () => {
    const requestData = {
      target: "http://localhost:8000",
      missionKey: "myRoom"
    };
    axios.post('http://localhost:3000/api/bind', requestData)
    .then(response => {
      console.log(response.status)
      if(response.status === 200){
        socket.emit('joinRoom', 'myRoom');
        socket.on('connect', () => {
          console.log('Connected to Socket.IO server');
          //socket.emit('joinRoom', 'myRoom'); // Specify the room you want to join
        });
      }
    })
    
    // socket.emit('join_room', roomId, (response) => {
    //   if (response === 'success') {
    //     console.log('Join room successful');
    //     // Perform actions after successful room join
    //   } else {
    //     console.log('Join room failed');
    //     // Handle the failure case
    //   }
    // });
  };
  const rejoinRoom = () =>{
    console.log('Reconnected to Socket.IO server');
    if (loggedIn){
      socket.connect();
      //socket.emit('joinRoom', 'myRoom');
        
    }
  }
  return (
    <>
      <h1>Online Drone GCS</h1>
      <button onClick={simulateDisconnect}>sim_disconnect</button>
      <button onClick={rejoinRoom}>sim_reconnect</button>
      <input type="text" value={roomId} onChange={(e) => setRoomId(e.target.value)} />
      <button onClick={joinRoom}>Join Room</button>
      <button onClick={setMode}> Set Mode </button>
      <button onClick={toggleArm}> Arm Drone </button>
      <h3>Takeoff</h3>
      <button onClick={takeOffMode}> Take off </button>
      <h3>Land</h3>
      <button onClick={landMode}> Land </button>
      <h1>Telemetry Data: </h1>
      {telemData}
    </>
  )
}

export default App
