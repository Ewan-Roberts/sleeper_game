'use strict';
const PIXI = require('pixi.js');
const { Track } = require('../../sound');

const sleep = time => new Promise(resolve => setTimeout(resolve, time));

class Strike {
  constructor(shadow) {
    this.name = 'strike';

    this.shadow = shadow;
    this.sound = new Track('lighter.wav');
    this.sound.volume = 0.03;
  }

  async start() {
    this.shadow.intensity = 0;
    this.sound.play();

    await sleep(300);
    this.shadow.intensity = 0.5;
    this.shadow.range = 110;
    PIXI.shadows.filter.ambientLight = 0.12;

    await sleep(40);
    this.shadow.alpha = 0;
    PIXI.shadows.filter.ambientLight = 0;

    await sleep(1100);
    this.shadow.alpha = 1;
    this.shadow.intensity = 0.4;
    this.shadow.range = 140;
    PIXI.shadows.filter.ambientLight = 0.09;

    await sleep(30);
    this.shadow.alpha = 0;
    PIXI.shadows.filter.ambientLight = 0;

    await sleep(1000);
    this.shadow.alpha = 1;
    this.shadow.intensity = 0.6;
    this.shadow.range = 120;

    await sleep(40);
    this.shadow.destroy();
  }
}

module.exports = {
  Strike,
};
