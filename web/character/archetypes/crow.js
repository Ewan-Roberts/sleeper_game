'use strict';
const { Texture, tween, tweenManager, extras } = require('pixi.js');

const { enemys    } = require('../../engine/pixi_containers');
const { radian    } = require('../../utils/math');
const { draw_path } = require('../../utils/line');
const { Bird      } = require('../animations/bird');

class Crow extends extras.AnimatedSprite {
  constructor(data) {
    super([Texture.fromFrame('bird_8')]);
    this.id    = data.id;
    this.name  = 'crow';

    this.add_component(new Bird(this));

    this.tint     = 0x352925;
    this.rotation = 1.56;
    this.width    /= 2.5;
    this.height   /= 2.5;
    this.anchor.set(0.5);
    this.animationSpeed = 0.19;
    this.tween = tweenManager.createTween(this);

    enemys.addChild(this);
  }

  set path(path_array) {
    this.tween.path = new tween.TweenPath();
    for (let i = 1; i < path_array.length; i++) {
      this.tween.path.arcTo(
        path_array[i-1].x,
        path_array[i-1].y,
        path_array[i].x,
        path_array[i].y,
        50);
    }
    this.tween.time = this.time || 10000;

    this.tween.on('end', () => {
      this.destroy();
      this.tween.remove();
      this.tween = null;
    });
  }

  start() {
    this.tween.start();
    this.animation.move();
    this.play();
  }

  draw() {
    draw_path(this.tween.path);
  }

  set turn(bool) {
    if(!bool) return;

    this.tween.on('update', () => {
      this.rotation = radian(this, this.tween.path._tmpPoint) + 1.57;
    });
  }

  add_component(component) {
    this[component.name] = component;
  }
}

module.exports = {
  Crow,
};

