const io = require("socket.io")(3000, {
    cors:'*'
})

io.on('connection', socket =>{
    console.log(socket.id)
    //sendData(socket)
    socket.on('data', (args) =>{
        //console.log(args)
        //io.emit('telem', args)
        
    })
    
    socket.on("takeoff", (args)=>{
        io.emit('takeoffcommand', "takeoff")
        console.log(args)
    })
})

 const sendData =(socket)=>{
     //console.log(socket)
     socket.emit('telem', "args")
 }
