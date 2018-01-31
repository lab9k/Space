/**
 * Lab9K
 */
"use strict";

const points = [];

window.requestAnimationFrame = (function(){
    return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function (callback) {
            window.setTimeout(callback, 1000);
        };
})();

let socket = io.connect();
// Initialize

(function() {

    // Configs

    var BACKGROUND_COLOR      = 'rgba(11, 51, 56, 1)',
        RADIUS        = 10;

    // Vars

    var canvas, context,
        bufferCvs, bufferCtx,
        screenWidth, screenHeight,
        grad;

    // Init

    canvas  = document.getElementById('c');
    bufferCvs = document.createElement('canvas');

    // Event Listeners

    function resize(e) {
        screenWidth  = canvas.width  = window.innerWidth;
        screenHeight = canvas.height = window.innerHeight;
        bufferCvs.width  = screenWidth;
        bufferCvs.height = screenHeight;
        context   = canvas.getContext('2d');
        bufferCtx = bufferCvs.getContext('2d');

        var cx = canvas.width * 0.5,
            cy = canvas.height * 0.5;

        grad = context.createRadialGradient(cx, cy, 0, cx, cy, Math.sqrt(cx * cx + cy * cy));
        grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0.35)');
    }

    function mouseDown(e) {
        socket.emit('click', {clientX : e.clientX, clientY : e.clientY});
        points.push({x : e.clientX, y : e.clientY});
    }

    function mouseUp() {
        setTimeout(() => points.splice(0,1), 250);
    }

    window.addEventListener('resize', resize, false);
    canvas.addEventListener('mousedown', mouseDown, false);
    canvas.addEventListener('mouseup', mouseUp, false);
    resize(null);

    var loop = function() {
        context.save();
        context.fillStyle = BACKGROUND_COLOR;
        context.fillRect(0, 0, screenWidth, screenHeight);
        context.fillStyle = grad;
        context.fillRect(0, 0, screenWidth, screenHeight);
        context.restore();

        for (let i = 0; i < points.length; i++) {
            renderPoint(context, points[i].x, points[i].y, RADIUS)
        }

        requestAnimationFrame(loop);
    };
    loop();
})();

function renderPoint(ctx, x, y, radius) {
    var grd, r;

    ctx.save();

    grd = ctx.createRadialGradient(x, y, radius, x, y, radius * 5);
    grd.addColorStop(0, 'rgba(0, 0, 0, 0.1)');
    grd.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.beginPath();
    ctx.arc(x, y, radius * 5, 0, Math.PI * 2, false);
    ctx.fillStyle = grd;
    ctx.fill();

    r = Math.random() * radius * 0.7 + radius * 0.3;
    grd = ctx.createRadialGradient(x, y, r, x, y, radius);
    grd.addColorStop(0, 'rgba(0, 0, 0, 1)');
    grd.addColorStop(1, Math.random() < 0.2 ? 'rgba(255, 196, 0, 0.15)' : 'rgba(103, 181, 191, 0.75)');
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    ctx.fillStyle = grd;
    ctx.fill();
    ctx.restore();
}