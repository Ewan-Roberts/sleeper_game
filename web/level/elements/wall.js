'use strict';
const { collision_container } = require('../../engine/pixi_containers');

const event    = require('events');
const { Item } = require('./item_model');

//TODO remove item extend
class Wall extends Item {
  constructor(options) {
    super('black_dot');

    this.shadow = true;
    this.anchor = 0;

    this.sprite.events = new event();
    this.sprite.events.on('damage', damage => this.on_hit(damage));

    if(options && options.hidden) {
      this.alpha = 0;
    }

    collision_container.addChild(this.sprite);
  }

  on_hit() {
    console.log('wall hit');
  }
}

module.exports = {
  Wall,
};
