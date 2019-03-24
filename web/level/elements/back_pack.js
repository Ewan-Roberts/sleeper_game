'use strict';
const { item_container } = require('../../engine/pixi_containers');

const { Lootable } = require('../../character/attributes/lootable');
const { Item     } = require('./item_model');

class Backpack extends Item {
  constructor() {
    super('back_pack');
    this.name = 'back_pack';

    this.add_component(new Lootable(this));

    this.width  = 50;
    this.height = 80;
    this.state  = 'closed';

    item_container.addChild(this.sprite);
  }
}

module.exports = {
  Backpack,
};
