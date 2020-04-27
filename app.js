const express = require("express")();
const http = require("http").Server(Express);
const socketio = require("socket.io")(Http);

var position = {
    x: 0,
    y= 0
}


http.listen(3000, () =>{
    console.log("Listening at 3000...");
});