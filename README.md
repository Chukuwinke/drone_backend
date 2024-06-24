# Drone Backend Api 

## A drone backend Project. Currently a drone simulation, to be tested on real drone hardware in the future!

This project is an example drone backend infrastructure capable of interacting with a frontend.
this project showcases the following:

* express.js node server that proxies request from frontend to drone instance
* drone application that recieves proxied request from frontend and launches instance
* command are then communicated through sockets (Socket.IO) library
* can run with ardupilot and px4 firmwares


