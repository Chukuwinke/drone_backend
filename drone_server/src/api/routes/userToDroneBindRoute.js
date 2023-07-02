const express = require('express');
const router = express.Router();
const {droneUserConnect} = require('../controllers/userToDroneBindController')
const { createProxyMiddleware } = require('http-proxy-middleware');

router.use((req, res, next) => {
    const { target, missionKey } = req.body; // Get the target URL from the query parameters
    // CONTINUE FROM HERE::: NEED TO FIND A WAY TO PASS THE DYNAMIC URL(/api/bind)
    // AND MAKE THIS LOGIC REUSEABLE
    console.log(target)
    if (target) {
      const apiProxy = createProxyMiddleware('/', {
        target,
        changeOrigin: true,
  
        // Intercept the outgoing request to the drone server
        onProxyReq: async(proxyReq, req, res) => {
          if (req.body) {
            const bodyData = JSON.stringify(req.body);
            proxyReq.setHeader('Content-Type', 'application/json');
            proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
            proxyReq.write(bodyData);
          }
        }
      });
  
      apiProxy(req, res, next); // Use the proxy middleware
    } else {
      next(); // If no target URL is provided, proceed to the next middleware/route
    }
  });
// add any other routes above this one
//router.use('/bind', apiProxy);


module.exports = router
