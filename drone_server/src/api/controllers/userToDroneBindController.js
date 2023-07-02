const axios = require('axios');

exports.droneUserConnect = async (target, missionKey)=> {
    // Access the response data
    //console.log('Response: ', data)
    console.log("Reached 3")
    // pass the data to the bind controller in my backend server
    try {
        console.log('Response from bind controller:', typeof(target));
        const response = await axios.post('http://localhost:8000/api/bind', {target, missionKey});
        
    } catch (error) {
        console.error('Error calling bind controller:', error);
    }
}