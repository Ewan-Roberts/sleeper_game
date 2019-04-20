'use strict';

const { Sound } = require('../../engine/sound');
const { sleep } = require('../../utils/time');

class Strike {
  constructor(shadow) {
    this.name = 'strike';

    this.shadow = shadow;
  }

  async start() {
    Sound.play('lighter_strike');

    await sleep(300);
    this.shadow.alpha = 0.5;
    this.shadow.range = 110;

    await sleep(40);
    this.shadow.alpha = 0;

    await sleep(1100);
    this.shadow.alpha = 0.4;
    this.shadow.range = 140;

    await sleep(30);
    this.shadow.alpha = 0;

    await sleep(1000);
    this.shadow.alpha = 0.6;
    this.shadow.range = 180;

    this.shadow.destroy();
  }
}

module.exports = {
  Strike,
};
