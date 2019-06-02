'use strict';
const { collisions    } = require('../../engine/pixi_containers');

const { Item } = require('./item_model');

class CollisionItem extends Item {
  constructor(data) {
    super(data);

    this.sprite.anchor.x = 0;
    this.sprite.anchor.y = 1;

    this.alpha = data.properties.alpha || 1;
    this.tint = 0xA9A9A9;

    collisions.addChild(this.sprite);
  }
}

module.exports = {
  CollisionItem,
};
