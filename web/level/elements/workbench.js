'use strict';
const { collision_container } = require('../../engine/pixi_containers');

const { Lootable } = require('../../character/attributes/lootable');
const { Item     } = require('./item_model');

class Workbench extends Item {
  constructor() {
    super('workbench');
    this.name  = 'workbench';

    this.sprite.width = 200;
    this.sprite.height = 100;
    this.add_component(new Lootable(this));

    collision_container.addChild(this.sprite);
  }
}

module.exports = {
  Workbench,
};


