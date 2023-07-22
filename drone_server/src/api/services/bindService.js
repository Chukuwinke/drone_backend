// Create bind service to handle connection between drone and user
const { createProxyMiddleware } = require('http-proxy-middleware')

// Function to intercept and transform request and response data to fit recievers 
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
            // For example, reconstruct the response data
            let responseData = '';
            proxyRes.on('data', (chunk) => {
              responseData += chunk;
            });
  
            proxyRes.on('end', () => {
              // The data can be transformed here and written to res
              
              console.log(responseData);
            });
          }
      });
  
    apiProxy(req, res); // Use the proxy middleware
}

module.exports = bindPilotAndDrone;