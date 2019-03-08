'use strict';

const { visual_effects_container } = require('../../engine/pixi_containers');

const { Light } = require('../light_model');

class Bright_Light extends Light {
  constructor() {
    super();
    this.name = 'bright_light';

    this.shadow.pointCount = 1;
    this.shadow.range      = 1000;
    this.shadow.intensity  = 0.5;

    visual_effects_container.addChild(this.shadow);
  }
}

module.exports = {
  Bright_Light,
};
