'use strict';

const PIXI = require('pixi.js');
// const { visual_effects_container } = require('../../engine/pixi_containers');

const { Track  } = require('../../sound');
const { Light  } = require('../light_model');
const { Strike } = require('../attributes/strike');
const { Flicker } = require('../attributes/flicker');

class Dev_Light extends Light {
  constructor() {
    super();

    this.add_component(new Strike());
    this.add_component(new Flicker(this.shadow));

    this.shadow.pointCount = 1;
    this.shadow.range = 500;
    this.shadow.overlayLightLength = 200;
    this.shadow.intensity = 0.8;
    this.shadow.ambientLight = 0.5;
    this.sound = new Track('lighter.wav');
    this.sound.volume = 0.03;

    PIXI.shadows.filter.ambientLight = 0.02;
  }
}

module.exports = {
  Dev_Light,
};
