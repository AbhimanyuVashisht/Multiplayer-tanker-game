let socket = io();

let move = {
    up: false,
    down: false,
    right: false,
    left: false
};

document.addEventListener('keydown', (event) => {
   switch (event.keyCode){
       case 65:
           move.left = true;
           break;
       case 87:
           move.up = true;
           break;
       case 68:
           move.right = true;
           break;
       case 83:
           move.down = true;
           break;
   }
});

document.addEventListener('keyup', (event) => {
    switch (event.keyCode){
        case 65:
            move.left = false;
            break;
        case 87:
            move.up = false;
            break;
        case 68:
            move.right = false;
            break;
        case 83:
            move.down = false;
            break;
    }
});

socket.emit('new player');
setInterval(() => {
    socket.emit('movement', move)
}, 1000 / 60);

let canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 600;
let context = canvas.getContext('2d');
socket.on('state', (players) => {
    context.clearRect(0, 0, 800, 600);
    context.fillStyle = '#008000';
    for(let id in players){
        let player = players[id];
        context.beginPath();
        context.arc(player.x, player.y, 10, 0, 2 * Math.PI);
        context.fill();
    }
});