
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
        console.log("join system active!!")
        //sendData(socket)

        // Perform authentication checks
        // if (!authenticateUser(socket)) {
        //     // Authentication failed
        //     socket.disconnect(true);
        //     return;
        // }

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
    });



    // Handle reconnect events
    // io.on('reconnect', () => {
    //     console.log('Reconnected to the server');
    //     // Perform any necessary actions after successful reconnection
    // });

    // io.on('reconnect_attempt', (attemptNumber) => {
    //     console.log(`Attempting to reconnect (${attemptNumber})...`);
    //     // Perform any necessary actions before each reconnection attempt
    // });

    // io.on('reconnect_error', (error) => {
    //     console.log('Reconnection error:', error);
    //     // Perform any necessary actions when a reconnection error occurs
    // });

    // io.on('reconnect_failed', () => {
    //     console.log('Failed to reconnect to the server');
    //     // Perform any necessary actions when reconnection attempts fail
    // });
}

const socketManger = (server) => {
    const io = require('socket.io')(server, {cors:'*'});

    // if connection conditions are met join systems else disconnect
    
    joinSystems(io);
    
    
}

module.exports = socketManger;