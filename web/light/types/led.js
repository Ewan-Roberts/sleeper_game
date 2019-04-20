'use strict';

const { visual_effects_container } = require('../../engine/pixi_containers');

const { Light   } = require('../light_model');
const { Flicker } = require('../attributes/flicker');

class LED extends Light {
  constructor() {
    super();
    this.name = 'led';
    this.add_component(new Flicker(this.shadow));

    this.shadow.pointCount = 1;
    this.shadow.range      = 200;
    this.shadow.intensity  = 0.5;

    visual_effects_container.addChild(this.shadow);
  }

}

module.exports = {
  LED,
};
