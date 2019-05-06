'use strict';
const { roofs } = require('../../engine/pixi_containers');

const { Item } = require('./item_model');

//TODO remove item extend
class Roof extends Item {
  constructor(options) {
    super(options);
    this.sprite.fade_opacity = options.properties.fade;
    this.alpha = options.properties.alpha | 1;
    this.anchor = 0;

    roofs.addChild(this.sprite);
  }
}

module.exports = {
  Roof,
};
