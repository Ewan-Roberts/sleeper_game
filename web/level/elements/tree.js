'use strict';
const { roof_container } = require('../../engine/pixi_containers');

const { Item } = require('./item_model');

class Tree extends Item {
  constructor(options) {
    super(options.image_name);

    this.sprite.fade_opacity = options.fade;

    roof_container.addChild(this.sprite);
  }
}

module.exports = {
  Tree,
};
