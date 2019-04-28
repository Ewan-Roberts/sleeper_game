'use strict';
const { background_container } = require('../../engine/pixi_containers');

const { Item } = require('./item_model');

class BackgroundVisualItem extends Item {
  constructor(options) {
    super(options.properties.image_name);

    if(options.properties.opacity) {
      this.sprite.alpha = options.properties.opacity;
    }

    background_container.addChild(this.sprite);
  }
}

module.exports = {
  BackgroundVisualItem,
};
