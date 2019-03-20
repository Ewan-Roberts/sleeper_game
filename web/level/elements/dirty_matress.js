'use strict';
const { collision_container } = require('../../engine/pixi_containers');

const { Item } = require('./item_model');

class Matress extends Item {
  constructor() {
    super('dirty_matress');
    this.name  = 'dirty_matress';

    this.sprite.width = 300;
    this.sprite.height = 180;

    collision_container.addChild(this.sprite);
  }
}

module.exports = {
  Matress,
};


