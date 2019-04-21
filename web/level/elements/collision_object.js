'use strict';
const { collision_container } = require('../../engine/pixi_containers');

const { Item } = require('./item_model');

class CollisionItem extends Item {
  constructor(options) {
    super(options.image_name);

    if(options.shadow) {
      this.shadow = true;
      this.shade.anchor.y= 1;
      this.shade.anchor.x= 0;
    }

    if(options.hidden) {
      this.alpha = 0;
    }

    collision_container.addChild(this.sprite);
  }
}

module.exports = {
  CollisionItem,
};
