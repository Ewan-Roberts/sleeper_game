'use strict';
const PIXI = require('pixi.js');

const { gui_container } = require('./pixi_containers');

class tween {
  constructor(sprite) {
    this.sprite = sprite;

    this.path = new PIXI.tween.TweenPath();
    this.path.moveTo(sprite.x, sprite.y);
  }

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

  start(time) {
    this.movement = PIXI.tweenManager.createTween(this.sprite);
    this.movement.expire  = true;
    this.movement.path   = this.path;
    this.movement.time   = time;

    this.movement.start();
  }

  show() {
    const graphical_path = new PIXI.Graphics();
    graphical_path.lineStyle(5, 0xffffff, 0.1);
    graphical_path.drawPath(this.path);

    gui_container.addChild(graphical_path);
  }
}


module.exports = {
  tween,
};



