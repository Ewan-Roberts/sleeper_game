'use strict';
const PIXI = require('pixi.js');

const { gui_container } = require('./pixi_containers');
const { random_number } = require('../utils/math');

class Tween {
  constructor(sprite, light) {
    this.name     = 'tween';

    this.sprite   = sprite;
    this.light    = light;
    this.movement = PIXI.tweenManager.createTween(this.sprite);
    this.path = new PIXI.tween.TweenPath();
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

  add_random_path(sprite, tween_path) {
    this.path = new PIXI.tween.TweenPath();
    const random = () => random_number(-30, 30);

    this.path.moveTo(sprite.x, sprite.y);
    for (let i = 2; i < tween_path.length; i++) {
      this.path.arcTo(
        tween_path[i-1].x + random(),
        tween_path[i-1].y + random(),
        tween_path[i].x   + random(),
        tween_path[i].y   + random(),
        this.path_arc);
    }
  }

  set time(amount) {
    this.movement.time = amount;
  }

  set delay(amount) {
    this.movement.delay = amount;
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
  }

  chain() {
    if(this.show) this.draw_path();

    const chain_tween = PIXI.tweenManager.createTween(this.sprite);
    chain_tween.path = this.path;

    this.movement.chain(chain_tween);
    this.movement = chain_tween;
  }

  draw_path() {
    const graphical_path = new PIXI.Graphics();
    graphical_path.lineStyle(5, 0xffffff, 0.5);
    graphical_path.drawPath(this.path);

    gui_container.addChild(graphical_path);
  }
}

module.exports = {
  Tween,
};
