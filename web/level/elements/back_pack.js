'use strict';

const { Lootable       } = require('../../character/attributes/lootable');
const { item_container } = require('../../engine/pixi_containers');
const { Item           } = require('./item_model');

class Backpack extends Item {
  constructor() {
    super('back_pack');
    this.name  = 'back_pack';

    this.state = 'closed';
    this.add_component(new Lootable(this));

    item_container.addChild(this.sprite);
  }
}

module.exports = {
  Backpack,
};


