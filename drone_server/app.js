require('dotenv').config();
const express = require('express');
//const { createProxyMiddleware } = require('http-proxy-middleware')
const cors = require("cors");
const cookieParser = require('cookie-parser');
const app = express();
const socketManger = require('./src/api/sockets/socketManager');

const signUpRoutes = require('./src/api/routes/signUpRoutes');
const loginRoutes = require('./src/api/routes/loginRoutes')
const bindRoutes = require('./src/api/routes/userToDroneBindRoute')

// Middleware to handle permissions
 app.use(cors());

 // Express middleware to handle json
 app.use(express.json());
 app.use(express.urlencoded({extended: true}));

 // Cookie parser middleware to handle cookies
 app.use(cookieParser());

 // custom routes with middleware
 app.use('/api', bindRoutes);
 app.use('/api', signUpRoutes);
 app.use('/api', loginRoutes);
 
 
 app.get('/', (req, res) => {
    res.send(" Hi from youtube live");
 });



 //

const server = app.listen(3000, () => {
    console.log("server started on port 3000");
});
socketManger(server);


