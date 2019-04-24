'use strict';
const PIXI = require('pixi.js');

// TODO This class is a slight exception
// It does not extent the Light model
// it may need to be in effects
class Ambient {
  constructor() {
    this.name = 'ambient';
  }

  fade_in(speed = 0.05, limit = 1) {
    const fade_timer  = PIXI.tweenManager.createTween(this.sprite);
    fade_timer.time   = 140;
    fade_timer.repeat = 50;
    fade_timer.expire = true;

    fade_timer.on('repeat', () => {
      if(PIXI.shadows.filter.ambientLight > limit) {
        return fade_timer.remove();
      }

      return PIXI.shadows.filter.ambientLight += speed;
    });

    fade_timer.on('end', () => fade_timer.remove());

    fade_timer.start();
  }

  fade_out(speed = 0.05, limit = 0) {
    const fade_timer  = PIXI.tweenManager.createTween(this.sprite);
    fade_timer.time   = 100;
    fade_timer.repeat = 50;
    fade_timer.expire = true;

    fade_timer.on('repeat', () => {
      if(PIXI.shadows.filter.ambientLight < limit) {
        return fade_timer.remove();
      }

      return PIXI.shadows.filter.ambientLight -= speed;
    });

    fade_timer.start();
  }
}

module.exports = {
  Ambient,
};
