const CELL_SIZE = 7;
const BACKGROUND_COLOR = "#070024";



var canvas = document.getElementById("myCanvas").getContext("2d");
var cellSize = cellSize;
var width = document.getElementById("myCanvas").width;
var height = document.getElementById("myCanvas").height;
var lightCycles = [];
var recordedPositions = [];
var colors = ["#FF0000","#00ff00","#0000ff","#ffffff"]

arr = [[[2,40]], [[77,39]], [[40,77]], [[39,2]]]
draw(arr)

function draw(arr) {
// We draw all the canvas with a color
canvas.fillStyle = BACKGROUND_COLOR;
canvas.fillRect(0, 0, width, height);
var i = 0;

/*
for(var j = 0; j < width ; j += 10){
    canvas.beginPath();
    canvas.moveTo(0, j);
    canvas.lineTo(width, j);
    canvas.stroke();
}

for(var j = 0; j < width ; j += 10){
    canvas.beginPath();
    canvas.moveTo(j, 0);
    canvas.lineTo(j, width);
    canvas.stroke();
}
*/

arr.forEach(player => {
    canvas.fillStyle = colors[i++];
    player.forEach(position =>{
            console.log(position)
            drawPos(position);
    });
});

}



function drawPos(arr){
    canvas.beginPath();
    canvas.fillRect(
        width / 80 * arr[0],
        width / 80 * arr[1],
        height / 80,
        height / 80
    );
}
