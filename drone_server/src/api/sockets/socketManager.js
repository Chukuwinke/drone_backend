
/**
 * get a live signal from client and drone 
 * if both signals conditions are met start socket connection
 * 
 * if drone is available connect client to drone
 */


const availableDrones = {
    drone1: {
        callSign: "alpha123",
        available:true
    },
    drone2: {
        callSign: "bravo123",
        available:true
    },
    drone3: {
        callSign: "tango123",
        available:true
    },
    drone4: {
        callSign: "charlie123",
        available:true
    },
}
const maxSocketsPerRoom = 2;

// Function to create proxy between to sockets 
const joinSystems = (io) => {
    io.on('connection', socket =>{
        console.log("join system active!! ", socket.id)
        //sendData(socket)

        // Perform authentication checks
        // if (!authenticateUser(socket)) {
        //     // Authentication failed
        //     socket.disconnect(true);
        //     return;
        // }

        // Function to check the number of sockets in the room
        const getSocketsjoined = (room) =>{
            return io.sockets.adapter.rooms.get(room)?.size || 0;
        }

        // Join two clients in a room
        socket.on('joinRoom', (room) => {
            console.log("lisitner working");
            const socketAmount = getSocketsjoined(room);
            if (socketAmount < maxSocketsPerRoom){
                socket.join(room);
                console.log(`Socket ${socket.id} joined room: ${room}`);
            }           
        });

        // Remove the socket from all rooms it has joined
        socket.on('disconnect', () => {
            console.log(`Socket ${socket.id} disconnected.`);
            socket.rooms.forEach((room) => {
              if (room !== socket.id) {
                socket.leave(room, (err) => {
                  if (err) {
                    console.error(`Error removing socket ${socket.id} from room ${room}:`, err);
                  } else {
                    console.log(`Socket ${socket.id} removed from room ${room}.`);
                  }
                });
              }
            });
          });
        
        socket.on('privateMessage', (data) => {
            const { recipient, message } = data;
            io.to(recipient).emit('message', message);
        });

        // INCOMPLETE! listeners for comunication with drone to user and vice versa
        socket.on('data', (args) =>{
            //console.log(args)
            io.emit('telem', args)
            
        })
        
        socket.on("takeoff", (args)=>{
            io.emit('takeoffCommand', "takeoff")
            console.log(args)
        })
    
        socket.on("setMode", ()=>{
            io.emit('modeCommand', "modeset")
        })
    
        socket.on("toggleArm", ()=>{
            io.emit('toggleArmCommand', "armDisarm")
        })
        // INCOMPLETE!
    });

}

const socketManger = (server) => {
    const io = require('socket.io')(server, {cors:'*'});

    // if connection conditions are met join systems else disconnect
    
    joinSystems(io);
    
    
}

module.exports = socketManger;