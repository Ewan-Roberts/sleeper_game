'use strict';
const { collision_container } = require('../../engine/pixi_containers');

const event    = require('events');
const { Item } = require('./item_model');

class Wall extends Item {
  constructor(data) {
    super('black_dot');

    this.anchor = 0;
    this.width = data.width;
    this.height= data.height;
    this.sprite.events = new event();
    this.sprite.events.on('damage', damage => this.on_hit(damage));

    this.set_position(data);
    if(data.options && data.options.hidden) {
      this.alpha = 0;
    }

    this.shadow = true;
    collision_container.addChild(this.sprite);
  }

  on_hit() {
    console.log('wall hit');
  }
}

module.exports = {
  Wall,
};
