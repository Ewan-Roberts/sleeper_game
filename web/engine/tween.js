'use strict';
const PIXI = require('pixi.js');

const { gui_container } = require('./pixi_containers');

class Tween {
  constructor(sprite, light) {
    this.name     = 'tween';

    this.sprite   = sprite;
    this.light    = light;
    this.movement = PIXI.tweenManager.createTween(this.sprite);
    // this.movement.expire  = true;
    this.path_arc = 15;
    this.show = false;
    this.time = 0;
  }

  from(start) {
    this.path.moveTo(start.x, start.y);
  }

  to(finish) {
    this.path.lineTo(finish.x, finish.y);
  }

  move_to({ x, y }) {
    this.path.lineTo(x, y);
  }

  smooth() {
    this.movement.easing = PIXI.tween.Easing.inOutQuad();
  }

  set path_smoothness(value) {
    this.path_arc = value;
  }

  add_path(tween_path) {
    this.path = new PIXI.tween.TweenPath();

    for (let i = 1; i < tween_path.length; i++) {
      this.path.arcTo(
        tween_path[i-1].x,
        tween_path[i-1].y,
        tween_path[i].x,
        tween_path[i].y,
        this.path_arc);
    }

  }

  set time(amount) {
    this.movement.time = amount;
  }

  stop() {
    this.movement.stop();
  }

  start() {
    if(!this.movement.time) {
      throw new Error('time not set for tween');
    }

    this.movement.path = this.path;
    this.movement.start();

    if(this.show) this._draw_path();
  }

  chain(path) {
    this.movement.on('end', () => {
      const new_tween = PIXI.tweenManager.createTween(this.sprite);

      this.add_path(path);
      new_tween.path = this.path;

      if(this.show) this._draw_path();

      new_tween.time = 1000;
      new_tween.delay = 500;
      this.movement.chain(new_tween);
      this.movement = new_tween;
    });
  }

  _draw_path() {
    const graphical_path = new PIXI.Graphics();
    graphical_path.lineStyle(5, 0xffffff, 0.5);
    graphical_path.drawPath(this.path);

    gui_container.addChild(graphical_path);
  }
}

module.exports = {
  Tween,
};
