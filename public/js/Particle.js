/************************************************
 *                 Particle class               *
 *                                              *
 *                     Lab9K                    *
 ************************************************/
"use strict";

function Particle(x, y, radius) {
    Vector.call(this, x, y);
    this.radius = radius;

    this._latest = new Vector();
    this._speed  = new Vector();
}

Particle.prototype = (function(o) {
    var s = new Vector(0, 0), p;
    for (p in o) s[p] = o[p];
    return s;
})({
    addSpeed: function(d) {
        this._speed.add(d);
    },

    update: function() {
        if (this._speed.length() > 12) this._speed.normalize().scale(12);

        this._latest.set(this);
        this.add(this._speed);
    }

    // render: function(ctx) {
    //     if (this._speed.length() > 12) this._speed.normalize().scale(12);

    //     this._latest.set(this);
    //     this.add(this._speed);

    //     ctx.save();
    //     ctx.fillStyle = ctx.strokeStyle = '#fff';
    //     ctx.lineCap = ctx.lineJoin = 'round';
    //     ctx.lineWidth = this.radius * 2;
    //     ctx.beginPath();
    //     ctx.moveTo(this.x, this.y);
    //     ctx.lineTo(this._latest.x, this._latest.y);
    //     ctx.stroke();
    //     ctx.beginPath();
    //     ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    //     ctx.fill();
    //     ctx.restore();
    // }
});
