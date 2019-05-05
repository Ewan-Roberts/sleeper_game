'use strict';
const { roof_container } = require('../../engine/pixi_containers');

const { Item } = require('./item_model');

//TODO remove item extend
class Roof extends Item {
  constructor(options) {
    super(options);
    this.sprite.fade_opacity = options.properties.fade;
    this.alpha = options.properties.alpha | 0.2;

    roof_container.addChild(this.sprite);
  }
}

module.exports = {
  Roof,
};
