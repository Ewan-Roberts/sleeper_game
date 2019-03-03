'use strict';

const { Light   } = require('../light_model');
const { Fade    } = require('../attributes/fade');

class Sun extends Light {
  constructor() {
    super();

    this.add_component(new Fade(this));

    this.shadow.pointCount = 1;
    this.shadow.range      = 500;
    this.shadow.intensity  = 0.3;
  }
}

module.exports = {
  Sun,
};
