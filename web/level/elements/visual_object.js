'use strict';
const { backgrounds } = require('../../engine/pixi_containers');

const { Item } = require('./item_model');

class BackgroundVisualItem extends Item {
  constructor(data) {
    super(data);
    this.alpha  = data.properties.opacity || 1;
    this.sprite.anchor.x = 0;
    this.sprite.anchor.y = 1;
    this.sprite.rotation  = data.rotation * (Math.PI/180);

    backgrounds.addChild(this.sprite);
  }
}

module.exports = {
  BackgroundVisualItem,
};
