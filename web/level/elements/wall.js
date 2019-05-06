'use strict';
const { collisions } = require('../../engine/pixi_containers');

const event    = require('events');
const { Item } = require('./item_model');

class Wall extends Item {
  constructor(data) {
    super(data);

    this.shadow = true;
    this.anchor = 0;
    this.sprite.events = new event();
    this.sprite.events.on('damage', damage => this.on_hit(damage));
    if(data.options && data.options.hidden) {
      this.alpha = 0;
    }

    collisions.addChild(this.sprite);
  }

  on_hit() {
    console.log('wall hit');
  }
}

module.exports = {
  Wall,
};


