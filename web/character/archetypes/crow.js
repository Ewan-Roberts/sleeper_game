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

    //this.tint     = 0x352925;
    this.rotation = 1;
    this.width    /= 2.5;
    this.height   /= 2.5;
    this.anchor.set(0.5);
    this.animationSpeed = 0.29;
    this.tween = tweenManager.createTween(this);

    this.position.copy(data);
    if(data.polyline) {
      this.path = data.polyline.map(({x,y})=>({x:this.x+x, y:this.y+y}));
    }
    this.turn = true;
    this.animation.wait();
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

    this.tween.time = path_array.length*600;
  }

  set delay(value) {
    this.tween.delay = value;
  }

  start() {
    this.tween.start();
    this.tween.expire = true;
    this.animation.move();
    this.play();
    this.tween.on('end', () => {
      this.destroy();
      this.tween.remove();
      this.tween = null;
    });
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

