'use strict';

const PIXI = require('pixi.js');

//TODO this isnt really a mixin currently consider making it static
class Fade {
  constructor(sprite) {
    this.movement = PIXI.tweenManager.createTween(sprite);
    this.movement.time = 150;

    this.sprite = sprite;
  }

  in() {
    if(this.movement.active) return;
    if(this.sprite.alpha === 1) return;

    this.sprite.visible = true;
    this.movement.from({alpha: this.sprite.alpha});
    this.movement.to({alpha: 1});
    this.start();
  }

  to(value) {
    if(this.sprite.alpha === 0) return;
    this.sprite.visible = true;
    this.movement.from({alpha: this.sprite.alpha});
    this.movement.to({alpha: value});
    this.start();
  }

  out() {
    if(this.sprite.alpha === 0) return;
    this.movement.from({alpha: 1});
    this.movement.to({alpha: 0});
    this.start();
    this.movement.on('end', () => this.sprite.visible = false);
  }

  start() {
    this.movement.start();
  }
}

module.exports = {
  Fade,
};
