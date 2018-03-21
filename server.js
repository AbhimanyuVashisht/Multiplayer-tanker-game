const express = require('express');
const path = require('path');
const http = require('http');

const app = express();
const server = http.createServer(app);
let io = require('socket.io')(server);

let route = require('./app/routes/route');
app.use('/', route);

app.use('/static', express.static(path.join(__dirname, 'app/static')));

let players = {};
io.on('connection', function (socket) {
    socket.on('new player', () => {
        players[socket.id] = {
            x: 300,
            y: 300
        };
    });
    socket.on('movement', (data) => {
        let player = players[socket.id] || {};
        if(data.left){
            player.x -= 5;
        }
        if(data.up){
            player.y -= 5;
        }
        if(data.right){
            player.x += 5;
        }
        if(data.down){
            player.y += 5;
        }
    });
});

setInterval(() => {
    io.sockets.emit('state', players);
}, 1000 / 60);

server.listen(8000, function(){
    console.log("ServerRunning on http://localhost:8000/");
});