'use strict';

const { Lootable       } = require('../../character/attributes/lootable');
const { item_container } = require('../../engine/pixi_containers');
const { Item           } = require('./item_model');

class Workbench extends Item {
  constructor() {
    super('workbench');
    this.name  = 'workbench';

    this.sprite.width = 150;
    this.state = 'closed';
    this.add_component(new Lootable(this));

    item_container.addChild(this.sprite);
  }
}

module.exports = {
  Workbench,
};


