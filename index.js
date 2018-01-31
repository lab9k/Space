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

let beamers = [];

io.on('connection', function (socket) {
    console.log('User connected');

    if (socket.handshake.headers.referer.indexOf("beamer") !== -1) {
        beamers.push(socket);
    }

    socket.on('click', function (data) {
        for (let i = 0; i < beamers.length; i++) {
            beamers[i].emit('serverClick', data)
        }
    });
});

server.listen(3000, function () {
    console.log('Server listening on port 3000');
});
