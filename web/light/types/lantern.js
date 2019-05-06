'use strict';

const { visuals } = require('../../engine/pixi_containers');

const { Light   } = require('../light_model');
const { Flicker } = require('../attributes/flicker');
const { Tween   } = require('../../engine/tween');

class Lantern extends Light {
  constructor() {
    super();
    this.name = 'lantern';

    this.add_component(new Flicker(this.shadow));
    this.add_component(new Tween(this.shadow));

    this.shadow.pointCount = 1;
    this.shadow.range      = 500;
    this.shadow.intensity  = 0.6;

    visuals.addChild(this.shadow);
  }
}

module.exports = {
  Lantern,
};
