'use strict';
const PIXI = require('pixi.js');

const { world } = require('../engine/shadows');

class Camera {
  static begin_at(point) {
    world.position.set(point);

    return this;
  }

  static from(point) {
    this.path = new PIXI.tween.TweenPath();

    this.path.moveTo(point.x, point.y);

    return this;
  }

  static to(point) {
    this.path.lineTo(point.x, point.y);
    return this;
  }

  static start() {
    this.tween  = PIXI.tweenManager.createTween(world);
    this.tween.expire = true;
    this.tween.path   = this.path;
    this.tween.time   = 3000;

    this.tween.start();
  }
}



module.exports = {
  Camera,
};
