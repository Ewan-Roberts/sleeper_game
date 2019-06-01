'use strict';
const { collisions } = require('../../engine/pixi_containers');
const { Item       } = require('./item_model');

class Wall extends Item {
  constructor(data) {
    data.properties = {
      image_name : 'black_dot',
    };
    super(data);

    this.anchor = 0;
    if(data.options && data.options.alpha) {
      this.alpha = 0;
    }

    this.sprite.anchor.x = 0;
    this.sprite.anchor.y = 1;

    collisions.addChild(this.sprite);
  }
}

module.exports = {
  Wall,
};


