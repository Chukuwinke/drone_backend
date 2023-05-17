
/**
 * get a live signal from client and drone 
 * if both signals conditions are met start socket connection
 * 
 * if drone is available connect client to drone
 */


// let dummyClientOnline = false;
// let dummyDroneOnline = false;

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

const joinSystems = (io) => {

    io.on('connection', socket =>{
        console.log("socket.id")
        //sendData(socket)

        // Perform authentication checks
        if (!authenticateUser(socket)) {
            // Authentication failed
            socket.disconnect(true);
            return;
        }

        // Join two clients in a room
        socket.on('joinRoom', (room) => {
            socket.join(room);
        });
        
        socket.on('privateMessage', (data) => {
            const { recipient, message } = data;
            io.to(recipient).emit('message', message);
        });

        
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
    })
}

const socketManger = (server) => {
    const io = require('socket.io')(server, {cors:'*'});

    // if connection conditions are met join systems else disconnect
    
    joinSystems(io);
    
    
}

module.exports = socketManger;