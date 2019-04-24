'use strict';

const PIXI = require('pixi.js');

class Fade {
  constructor(entity) {
    this.name = 'fade';

    this.entity = entity;
    this.shadow = entity.shadow;
  }

  in(speed = 0.05, limit = 1) {
    const fade_timer = PIXI.tweenManager.createTween();
    fade_timer.time   = 100;
    fade_timer.repeat = 50;
    fade_timer.expire = true;

    fade_timer.on('repeat', () => {
      if(this.shadow.intensity > limit) {
        return fade_timer.remove();
      }

      this.shadow.intensity += speed;
    });

    fade_timer.on('end', () => fade_timer.remove());
    fade_timer.start();
  }

  out(speed = 0.05, limit = 0) {
    const fade_timer = PIXI.tweenManager.createTween();
    fade_timer.time   = 140;
    fade_timer.expire = true;
    fade_timer.repeat = 50;

    fade_timer.on('repeat', () => {
      if(this.shadow.intensity < limit) {
        this.entity.remove();

        return fade_timer.remove();
      }

      this.shadow.intensity -= speed;
    });

    fade_timer.on('end', () => {
      this.entity.remove();
      fade_timer.remove();
    });

    fade_timer.start();
  }
}

module.exports = {
  Fade,
};
