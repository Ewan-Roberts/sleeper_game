'use strict';

const { visuals } = require('../../engine/pixi_containers');

const { Light  } = require('../light_model');
const { Strike } = require('../attributes/strike');

class Bright_Light extends Light {
  constructor(options) {
    super();
    this.name = 'bright_light';

    this.shadow.pointCount = 1;
    this.shadow.range      = 200;
    this.shadow.intensity  = 0.5;
    this.add_component(new Strike(this));
    this.set_position(options);
    this.width    = options.width;
    this.height   = options.height;
    this.anchor   = 0;
    this.id       = options.id;

    const point = global.place_bunny(options);
    point.height = 20;
    point.width  = 20;

    visuals.addChild(this.shadow);
  }
}

module.exports = {
  Bright_Light,
};
