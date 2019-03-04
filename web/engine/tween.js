'use strict';
const PIXI = require('pixi.js');

const { gui_container } = require('./pixi_containers');

class Tween {
  constructor(sprite) {
    this.name   = 'tween';

    this.sprite = sprite;
    this.path   = new PIXI.tween.TweenPath();
    this.movement = PIXI.tweenManager.createTween(this.sprite);
    this.movement.expire  = true;

    this.time = 0;
  }

  from(start) { this.path.moveTo(start.x, start.y); }

  to(finish) { this.path.lineTo(finish.x, finish.y); }

  move_to({ x, y }) { this.path.lineTo(x, y); }

  smooth() { this.movement.easing = PIXI.tween.Easing.inOutQuad(); }

  add_path(tween_path) {
    for (let i = 1; i < tween_path.length; i++) {
      this.path.arcTo(
        tween_path[i-1].x,
        tween_path[i-1].y,
        tween_path[i].x,
        tween_path[i].y,
        15);
    }
  }

  set time(amount) {
    this.movement.time = amount;
  }

  start() {
    if(!this.movement.time) {
      throw new Error('time not set for tween');
    }

    this.movement.path = this.path;
    this.movement.start();
  }

  show() {
    const graphical_path = new PIXI.Graphics();
    graphical_path.lineStyle(5, 0xffffff, 0.5);
    graphical_path.drawPath(this.path);

    gui_container.addChild(graphical_path);
  }
}

module.exports = {
  Tween,
};
