'use strict';
const { collision_container } = require('../../engine/pixi_containers');

const event    = require('events');
const { Item } = require('./item_model');

class Wall extends Item {
  constructor() {
    super('black_dot');

    this.width  = 300;
    this.height = 20;
    this.sprite.events = new event();

    this.sprite.events.on('damage', damage => this.on_hit(damage));

    collision_container.addChild(this.sprite);
  }

  on_hit() {
    console.log('wall hit');
  }
}

module.exports = {
  Wall,
};
