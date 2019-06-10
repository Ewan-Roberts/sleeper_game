'use strict';
const { Texture, tween, tweenManager, extras } = require('pixi.js');
const { enemys    } = require('../../engine/pixi_containers');
const { Vitals    } = require('../attributes/vitals');
const { radian    } = require('../../utils/math');
const { Zombie    } = require('../animations/zombie');
const { Inventory } = require('../attributes/inventory');
const { draw_path } = require('../../utils/line');

const dead = [ Texture.fromFrame('death01_0000') ];

class Lurcher extends extras.AnimatedSprite {
  constructor(data) {
    super(dead);
    this.id   = data.id;
    this.name = 'crow';

    this.add_component(new Zombie(this));
    this.add_component(new Vitals(this));
    this.add_component(new Inventory(this));
    this.anchor.set(0.5);
    this.animationSpeed = 0.19;
    this.tint           = 0x352925;
    this.rotation       = 1.56;

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
        20);
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
      this.rotation = radian(this, this.tween.path._tmpPoint);
    });
  }

  add_component(component) {
    this[component.name] = component;
  }
}

module.exports = {
  Lurcher,
};
