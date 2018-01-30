/**
 * Space
 * Lab9K
 */

const express = require('express');
const http = require('http');
const socketio = require('socket.io');

let app = express();
let server = http.Server(app);
let io = socketio(server);

app.use(express.static('public'));

io.on('connection', function (socket) {
    console.log('User connected');
    socket.on('disconnect', function(){
        console.log('User disconnected');
    });
    socket.on('click', function (data) {
        io.sockets.emit('serverClick', data);
    });
});

server.listen(3000, function () {
    console.log('Server listening on port 3000');
});
