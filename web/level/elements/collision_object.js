'use strict';
const { collision_container } = require('../../engine/pixi_containers');

const { Item } = require('./item_model');

class CollisionItem extends Item {
  constructor(options) {
    super(options.image_name);

    collision_container.addChild(this.sprite);
  }
}

module.exports = {
  CollisionItem,
};
