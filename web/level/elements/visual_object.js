'use strict';
const { backgrounds } = require('../../engine/pixi_containers');

const { Item } = require('./item_model');

class BackgroundVisualItem extends Item {
  constructor(data) {
    super(data);

    this.alpha = data.properties.opacity | 1;
    this.anchor = 0;

    backgrounds.addChild(this.sprite);
  }
}

module.exports = {
  BackgroundVisualItem,
};
