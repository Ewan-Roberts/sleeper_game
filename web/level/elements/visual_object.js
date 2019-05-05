'use strict';
const { background_container } = require('../../engine/pixi_containers');

const { Item } = require('./item_model');

class BackgroundVisualItem extends Item {
  constructor(data) {
    super(data);

    this.alpha = data.properties.opacity | 1;
    this.anchor = 0;

    background_container.addChild(this.sprite);
  }
}

module.exports = {
  BackgroundVisualItem,
};
