'use strict';

const { visual_effects_container } = require('../../../engine/pixi_containers');

const { Light  } = require('../light_model');
const { Strike } = require('../attributes/strike');

class Lighter extends Light {
  constructor() {
    super();
    this.name = 'lighter';
    this.add_component(new Strike(this.shadow));

    this.shadow.pointCount = 1;
    this.shadow.range      = 200;
    this.shadow.intensity  = 0.5;

    visual_effects_container.addChild(this.shadow);
  }
}

module.exports = {
  Lighter,
};
