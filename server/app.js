const express = require("express")();
const server = require("http").Server(express);
const io = require("socket.io")(server);

let MAX_PLAYERS = 4;
var player_count = 0;
var players = [];

io.on("connection", function(socket) { // neue Verbindung eines Clients 
    socket.on("new player", () => {
        player_count++;
        players[socket.id] = socket; // json object mit position, color, ...???
        /*
        players[socket.id] = {
            x: 200,
            y: 200,
            length: 4,
            color: 0xFF0000 
        }
        */
       playerInfo = {
           name: "TestName",
           color: 0xFF0000
       }
       
       socket.emit("info", playerInfo)
    });

    socket.on('disconnect', () => {
        player_count--;
        players.splice(socket.id,1); 
    });

    socket.on("message", function(message) { // neue Nachricht
        socket.broadcast.emit(message);
    });
});

//senden der spieler an alle spieler
setInterval(() => {
    io.broadcast.emit("bc", players);
},1000/60)

server.listen(8000, function (){
    console.log('Server running at http://localhost:8000');
});