// Create bind service to handle connection between drone and user
const { createProxyMiddleware } = require('http-proxy-middleware')

const bindPilotAndDrone = async(target, req, res) => {

    console.log(target)
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
        },
        // Intercept the response from the drone server
        onProxyRes: async (proxyRes, req, res) => {
            // Modify the response if needed
            // For example, you can log the response data
            let responseData = '';
            proxyRes.on('data', (chunk) => {
              responseData += chunk;
            });
  
            proxyRes.on('end', () => {
              // Do something with the response data if required
              
              console.log(responseData);
            });
          }
      });
  
    apiProxy(req, res); // Use the proxy middleware
}

module.exports = bindPilotAndDrone;