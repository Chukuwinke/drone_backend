 const express = require('express');
 const cors = require("cors")
 const app = express();
 
 app.use(cors)
 const server = app.listen(3000, () => {
     console.log("server started on port 3000");
 });

 const io = require('socket.io')(server, {cors:'*'});


//const io = require("socket.io")(3000, {cors:'*'})

io.on('connection', socket =>{
    console.log(socket.handshake)
    //sendData(socket)
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

 const sendData =(socket)=>{
     console.log(socket)
     socket.emit('telem', "args")
 }
