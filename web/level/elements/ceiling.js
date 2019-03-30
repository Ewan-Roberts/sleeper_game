'use strict';
const { roof_container } = require('../../engine/pixi_containers');

const { Item } = require('./item_model');

class Roof extends Item {
  constructor(name) {
    super(name);

    roof_container.addChild(this.sprite);
  }
}

module.exports = {
  Roof,
};
