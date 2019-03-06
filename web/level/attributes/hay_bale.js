'use strict';

const { collision_container } = require('../../engine/pixi_containers');
const { Item } = require('./item_model');

class Hay extends Item {
  constructor() {
    super('bale_square');

    this.sprite.width  = 150;
    this.sprite.height = 120;

    collision_container.addChild(this.sprite);
  }
}

module.exports = {
  Hay,
};
