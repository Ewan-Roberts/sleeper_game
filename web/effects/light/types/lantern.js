'use strict';

const { Light   } = require('../light_model');
const { Flicker } = require('../attributes/flicker');
const { Tween   } = require('../../../engine/tween');

class Lantern extends Light {
  constructor() {
    super();

    this.add_component(new Flicker(this.shadow));
    this.add_component(new Tween(this.shadow));

    this.shadow.pointCount = 1;
    this.shadow.range = 500;
    this.shadow.overlayLightLength = 200;
    this.shadow.intensity = 0.6;
    this.shadow.ambientLight = 0.5;
  }
}

module.exports = {
  Lantern,
};
