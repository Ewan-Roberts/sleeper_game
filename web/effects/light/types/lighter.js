'use strict';

const PIXI = require('pixi.js');

const { Track  } = require('../../sound');
const { Light  } = require('../light_model');
const { Strike } = require('../attributes/strike');

class Lighter extends Light {
  constructor() {
    super();

    this.add_component(new Strike(this.shadow));

    this.shadow.alpha = 0;
    this.shadow.pointCount = 1;
    this.shadow.range = 200;
    this.shadow.overlayLightLength = 200;
    this.shadow.intensity = 0.5;
    this.shadow.ambientLight = 0.5;
    this.sound = new Track('lighter.wav');
    this.sound.volume = 0.03;

    PIXI.shadows.filter.ambientLight = 0.02;
  }
}

module.exports = {
  Lighter,
};
