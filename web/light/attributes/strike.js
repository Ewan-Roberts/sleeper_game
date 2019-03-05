'use strict';

const { Track } = require('../../effects/sound');
const { sleep } = require('../../engine/time');

class Strike {
  constructor(shadow) {
    this.name = 'strike';

    this.shadow = shadow;
    this.sound  = new Track('lighter.wav');
    this.sound.volume = 0;
  }

  async start() {
    this.sound.play();

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
