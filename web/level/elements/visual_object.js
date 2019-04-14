'use strict';
const { background_container } = require('../../engine/pixi_containers');

const { Item } = require('./item_model');

class BackgroundVisualItem extends Item {
  constructor(options) {
    super(options.image_name);

    background_container.addChild(this.sprite);
  }
}

module.exports = {
  BackgroundVisualItem,
};
