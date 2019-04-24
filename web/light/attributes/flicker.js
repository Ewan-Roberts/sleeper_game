'use strict';

const PIXI = require('pixi.js');

class Flicker {
  constructor(shadow) {
    this.name = 'flicker';

    this.shadow = shadow;
  }

  start() {
    const flicker_timer  = PIXI.tweenManager.createTween();
    flicker_timer.time   = 140;
    flicker_timer.repeat = 100;
    flicker_timer.expire = true;

    flicker_timer.on('repeat', () => {
      if(this.shadow.intensity > 0.4) {
        return this.shadow.intensity += ( Math.random()/16 - 0.05) ;
      }

      if(this.shadow.intensity < 0.9) {
        return this.shadow.intensity += ( Math.random()/16 + 0.05) ;
      }

      this.shadow.intensity += ( Math.random()/16 - 0.03) ;
    });

    flicker_timer.on('end', () => {
      this.shadow.intensity = 0.5;

      flicker_timer.remove();
    });

    flicker_timer.start();
  }

}

module.exports = {
  Flicker,
};
