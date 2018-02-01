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
let totalCounter = 0;
let counter = 0;

io.on('connection', function (socket) {
    console.log('User connected');
    totalCounter++;
    counter++;
    logUsers();

    if (socket.handshake.headers.referer.indexOf("beamer") !== -1) {
        beamers.push(socket);
    }

    socket.on('click', function (data) {
        for (let i = 0; i < beamers.length; i++) {
            beamers[i].emit('serverClick', data)
        }
    });

    socket.on('disconnect', function () {
        let index = beamers.indexOf(socket);
        if (index !== -1) {
            beamers.splice(index);
        }
        console.log('User disconnected');
        counter--;
        logUsers();
    });
});

server.listen(3003, function () {
    console.log('Server listening on port 3003');
});

function logUsers() {
    if (counter == 1) {
        console.log(counter + ' user connected. Total people ever connected: ' + totalCounter);
    } else {
        console.log(counter + ' users connected. Total people ever connected: ' + totalCounter);
    }
}