'use strict';

const { Lootable       } = require('../../character/attributes/lootable');
const { item_container } = require('../../engine/pixi_containers');
const { Item           } = require('./item_model');

class Chest extends Item {
  constructor() {
    super('chest_full');
    this.name  = 'chest';

    this.state = 'closed';
    this.add_component(new Lootable(this));

    item_container.addChild(this.sprite);
  }
}

module.exports = {
  Chest,
};
