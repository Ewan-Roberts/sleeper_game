'use strict';
const { collision_container } = require('../../engine/pixi_containers');

const { Item } = require('./item_model');

class Chair extends Item {
  constructor() {
    super('chair');
    this.name   = 'chair';

    this.width  = 100;
    this.height = 100;

    collision_container.addChild(this.sprite);
  }
}

module.exports = {
  Chair,
};


