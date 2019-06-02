'use strict';
const { roofs } = require('../../engine/pixi_containers');
const { Item  } = require('./item_model');

//TODO remove item extend
class Roof extends Item {
  constructor(options) {
    super(options);
    this.sprite.fade_opacity = options.properties.fade;
    this.alpha = options.properties.alpha || 0.9;
    this.sprite.anchor.x = 0;
    this.sprite.anchor.y = 1;
    this.tint = options.properties.tint || 0xffffff;

    roofs.addChild(this.sprite);
  }
}

module.exports = {
  Roof,
};
