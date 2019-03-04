'use strict';

const { visual_effects_container } = require('../../../engine/pixi_containers');

const { Light   } = require('../light_model');
const { Strike  } = require('../attributes/strike');
const { Flicker } = require('../attributes/flicker');
const { Fade    } = require('../attributes/fade');
const { Tween   } = require('../../../engine/tween');

class Dev_Light extends Light {
  constructor() {
    super();
    this.name = 'dev_light';

    this.add_component(new Strike());
    this.add_component(new Flicker(this.shadow));
    this.add_component(new Tween(this.shadow));
    this.add_component(new Fade(this));

    this.shadow.pointCount   = 1;
    this.shadow.range        = 500;
    this.shadow.intensity    = 0.8;
    this.shadow.ambientLight = 0.5;

    visual_effects_container.addChild(this.shadow);
  }
}

module.exports = {
  Dev_Light,
};
