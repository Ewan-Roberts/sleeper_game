'use strict';

const { visual_effects_container } = require('../../../engine/pixi_containers');

const { Light   } = require('../light_model');
const { Fade    } = require('../attributes/fade');

class Sun extends Light {
  constructor() {
    super();
    this.name = 'sun';

    this.add_component(new Fade(this));

    this.shadow.pointCount = 1;
    this.shadow.range      = 500;
    this.shadow.intensity  = 0.3;

    visual_effects_container.addChild(this.shadow);
  }
}

module.exports = {
  Sun,
};
