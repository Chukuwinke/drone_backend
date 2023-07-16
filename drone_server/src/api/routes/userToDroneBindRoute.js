const express = require('express');
const router = express.Router();
const {droneUserConnect} = require('../controllers/userToDroneBindController')

router.use((req, res, next) => {
    const { target, missionKey } = req.body; // Get the target URL from the query parameters
    // CONTINUE FROM HERE::: NEED TO FIND A WAY TO PASS THE DYNAMIC URL(/api/bind)
    // AND MAKE THIS LOGIC REUSEABLE
    console.log(target)
    if (target) {
      droneUserConnect(target, req, res)
      
    } else {
      next(); // If no target URL is provided, proceed to the next middleware/route
    }
  });
// add any other routes above this one
//router.use('/bind', apiProxy);


module.exports = router
