const { json } = require("express");

const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);


let MAX_PLAYERS = 4;
var player_count = 0;
var players = [];
var player_pos = [];
var step = 1; 

var possible_pos = [[2,40],[77,39],[40,77],[39,2]]

io.on("connection", function(socket) { // neue Verbindung eines Clients 
    console.log("new connection");
    socket.on("new player", (username) => {
        player_count++;
        player_info = {
            username: username,
            color: 0xFF0000
        }
        if(player_count == 1){
            player_pos_info = {
                pos: [possible_pos[0]],
                direction: "right"
            }
        }
        else if(player_count == 2){
            player_pos_info = {
                pos: [possible_pos[1]],
                direction: "left"
            }
        }
        else if(player_count == 3){
            player_pos_info = {
                pos: [possible_pos[2]],
                direction: "up"
            }
        }
        else if(player_count == 4){
            player_pos_info = {
                pos: [possible_pos[3]],
                direction: "down"
            }
        }
        
        player_pos[socket.id] = player_pos_info;
        players.push(player_info)
        socket.emit("all_players", players);
        socket.broadcast.emit("player joined", player_info)
        if(player_count == 4){
            io.emit("game_start");

            setInterval(game,1000/10);
        }
<<<<<<< HEAD
=======
        
>>>>>>> 4afae49310f77c30adb688a913316d39b26a021b
    });

    socket.on('disconnect', () => {
        player_count--;
        players.splice(socket.id,1); 
    });

    socket.on("message", function(message) { // neue Nachricht
        io.emit("message",message);
    });

    socket.on("left", function(){
        player_pos[socket.id].direction = "left";
    });

    socket.on("right", function(){
        player_pos[socket.id].direction = "right";
    });

    socket.on("up", function(){
        console.log("test");
        player_pos[socket.id].direction = "up";
    });

    socket.on("down", function(){
        player_pos[socket.id].direction = "down";
    });
});



function game(){
    pos = [];
    for(var el in player_pos){

        var lastEl = player_pos[el].pos[player_pos[el].pos.length - 1];
        if (player_pos[el].direction == "down"){
            player_pos[el].pos.push([lastEl[0],lastEl[1] + step]);
        } 
        else if (player_pos[el].direction == "up"){
            player_pos[el].pos.push([lastEl[0],lastEl[1] - step]);
        }
        else if (player_pos[el].direction == "left"){
            player_pos[el].pos.push([lastEl[0] - step,lastEl[1]]);
        }
        else if (player_pos[el].direction == "right"){
            player_pos[el].pos.push([lastEl[0] + step,lastEl[1]]);
        }
        pos.push(player_pos[el].pos)
    }
    
    io.emit("redraw", pos);
}



server.listen(8000, function (){
    console.log('Server running at http://localhost:8000');
});

