const { json } = require("express");

const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);


let MAX_PLAYERS = 4;
var player_count = 0;
var players = [];


io.on("connection", function(socket) { // neue Verbindung eines Clients 
    console.log("new connection");
    socket.on("new player", (username) => {
        player_count++;
        player_info = {
            username: username,
            color: 0xFF0000
        }
        players.push(player_info)
        socket.emit("all_players", players);
        socket.broadcast.emit("player joined", player_info)
    });

    socket.on('disconnect', () => {
        player_count--;
        players.splice(socket.id,1); 
    });

    socket.on("message", function(message) { // neue Nachricht
        io.emit("message",message);
    });
});

/*senden der spieler an alle spieler
setInterval(() => {
    io.broadcast.emit("bc", players);
},1000/60) */

server.listen(8000, function (){
    console.log('Server running at http://localhost:8000');
});

