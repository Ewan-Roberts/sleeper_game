'use strict';
const event = require('events');
const { collision_container } = require('../../engine/pixi_containers');

const { Item } = require('./item_model');

class CollisionItem extends Item {
  constructor(options) {
    super(options.image_name);

    if(options.shadow) {
      this.shadow = true;
      this.shade.anchor.y= 1;
      this.shade.anchor.x= 0;
      this.shade.events = new event();
      this.shade.events.on('damage', () => {
        this.shade.destroy();
        this.sprite.destroy();
      });
    }

    this.sprite.events = new event();
    this.sprite.events.on('damage', () => {
      this.sprite.destroy();
    });
    collision_container.addChild(this.sprite);
  }
}

module.exports = {
  CollisionItem,
};
