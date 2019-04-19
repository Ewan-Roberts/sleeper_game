'use strict';
const { roof_container } = require('../../engine/pixi_containers');

const { Item } = require('./item_model');

class Roof extends Item {
  constructor(options) {
    super(options.image_name);

    this.sprite.fade_opacity = options.fade;
    this.sprite.alpha = 0;

    roof_container.addChild(this.sprite);
  }
}

module.exports = {
  Roof,
};
