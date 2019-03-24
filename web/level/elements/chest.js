'use strict';
const { item_container } = require('../../engine/pixi_containers');

const { Lootable } = require('../../character/attributes/lootable');
const { Item     } = require('./item_model');

class Chest extends Item {
  constructor() {
    super('chest_full');
    this.name   = 'chest';

    this.add_component(new Lootable(this));

    this.width  = 100;
    this.height = 50;
    this.state  = 'closed';

    item_container.addChild(this.sprite);
  }
}

module.exports = {
  Chest,
};
