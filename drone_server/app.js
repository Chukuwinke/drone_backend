require('dotenv').config();
const express = require('express');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const app = express();
const socketManger = require('./src/api/sockets/socketManager');

const signUpRoutes = require('./src/api/routes/signUpRoutes')

// Middleware to handle permissions
 app.use(cors());

 // Express middleware to handle json
 app.use(express.json());
 app.use(express.urlencoded({extended: true}));

 // Cookie parser middleware to handle cookies
 app.use(cookieParser());

 // custom routes with middleware
 app.use('/api', signUpRoutes);
 
 
 app.get('/', (req, res) => {
    res.send(" Hi from youtube live");
 });



 

const server = app.listen(3000, () => {
    console.log("server started on port 3000");
});
socketManger(server);


