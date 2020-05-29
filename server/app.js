const express = require("express")();
const server = require("http").Server(express);
const io = require("socket.io")(server);

let MAX_PLAYERS = 4;
var player_count = 0;
var players = [];

io.on("connection", function(socket) { // neue Verbindung eines Clients 
    socket.on("new player", (username) => {
        player_count++;
        player_info = {
            username: username,
            color: 0xFF0000
        }
        players[socket.id] = player_info
        console.log("new player");
        socket.emit("player joined", player_info)
    });

    socket.on('disconnect', () => {
        player_count--;
        players.splice(socket.id,1); 
    });

    socket.on("message", function(message) { // neue Nachricht
        socket.broadcast.emit("message",message);
    });
});

//senden der spieler an alle spieler
setInterval(() => {
    io.broadcast.emit("bc", players);
},1000/60)

server.listen(8000, function (){
    console.log('Server running at http://localhost:8000');
});