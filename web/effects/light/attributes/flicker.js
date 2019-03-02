'use strict';

const { timer } = require('../../../engine/ticker');

class Flicker {
  constructor(shadow) {
    this.name = 'flicker';

    this.shadow = shadow;
  }

  start() {
    const flicker_timer  = timer.createTimer(200);
    flicker_timer.repeat = 25;

    flicker_timer.on('repeat', () => {
      this.shadow.intensity += ( Math.random()/16 - 0.03) ;
    });

    flicker_timer.on('end', function() {
      this.remove();
    });

    flicker_timer.start();
  }
}

module.exports = {
  Flicker,
};
