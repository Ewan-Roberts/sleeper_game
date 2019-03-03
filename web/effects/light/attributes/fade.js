'use strict';

const { timer } = require('../../../engine/ticker');

class Fade {
  constructor(entity) {
    this.name = 'fade';

    this.entity = entity;
    this.shadow = entity.shadow;
  }

  in(speed = 0.05, limit = 1) {
    const fade_timer  = timer.createTimer(100);
    fade_timer.repeat = 50;

    fade_timer.on('repeat', () => {
      if(this.shadow.intensity > limit) {
        return fade_timer.remove();
      }

      return this.shadow.intensity += speed;
    });

    fade_timer.on('end', () => fade_timer.remove());

    fade_timer.start();
  }

  out(speed = 0.05, limit = 0) {
    const fade_timer  = timer.createTimer(140);
    fade_timer.repeat = 50;

    fade_timer.on('repeat', () => {
      if(this.shadow.intensity < limit) {
        this.entity.remove();

        return fade_timer.remove();
      }

      return this.shadow.intensity -= speed;
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
