'use strict';
const { collision_container } = require('../../engine/pixi_containers');

const { Lootable } = require('../../character/attributes/lootable');
const { Item     } = require('./item_model');

class Workbench extends Item {
  constructor() {
    super('workbench');
    this.name  = 'workbench';

    this.add_component(new Lootable(this));
    this.width  = 200;
    this.height = 100;
    this.state  = 'closed';

    collision_container.addChild(this.sprite);
  }
}

module.exports = {
  Workbench,
};


