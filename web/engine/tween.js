'use strict';
const PIXI = require('pixi.js');

const { gui_container } = require('./pixi_containers');
const { random_number } = require('../utils/math');
require('./ticker');

class Tween {
  constructor(sprite) {
    this.name     = 'tween';
    this.sprite   = sprite;

    this.show = false;
    this.time = 2000;
  }

  from_path(start) {
    this.movement = PIXI.tweenManager.createTween(this.sprite);
    this.path = new PIXI.tween.TweenPath();
    this.path_arc = 15;
    this.path.moveTo(start.x, start.y);
  }

  to_path(finish) {
    this.path.lineTo(finish.x, finish.y);
  }

  from(data) {
    this.movement = PIXI.tweenManager.createTween(this.sprite);
    this.movement.expire = true;
    this.movement.from(data);
  }

  to(data) {
    this.movement.to(data);
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

  add_random_path(tween_path) {
    this.path = new PIXI.tween.TweenPath();

    const random = () => random_number(-20, 20);

    for (let i = 2; i < tween_path.length; i++) {
      this.path.arcTo(
        tween_path[i-1].x + random(),
        tween_path[i-1].y + random(),
        tween_path[i].x   + random(),
        tween_path[i].y   + random(),
        this.path_arc);
    }
  }

  set delay(amount) {
    this.movement.delay = amount;
  }

  stop() {
    this.movement.stop();
  }

  start() {
    if(this.path && this.path.currentPath) {
      console.log(this.path);
      this.movement.path = this.path;
    }

    this.movement.time = this.time;
    this.movement.start();
    this.movement.expire = true;
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
