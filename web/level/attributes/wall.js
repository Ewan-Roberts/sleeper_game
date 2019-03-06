'use strict';

const { collision_container } = require('../../engine/pixi_containers');
const { Item } = require('./item_model');

class Wall extends Item {
  constructor() {
    super('black_dot');

    this.sprite.width  = 300;
    this.sprite.height = 20;

    collision_container.addChild(this.sprite);
  }
}

module.exports = {
  Wall,
};
