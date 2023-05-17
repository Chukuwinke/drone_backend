const express = require('express');
const cors = require("cors")
const app = express();
const socketManger = require('./api/sockets/socketManager')



 app.use(cors)





const server = app.listen(3000, () => {
    console.log("server started on port 3000");
});

socketManger(server);

