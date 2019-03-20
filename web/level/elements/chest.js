'use strict';
const { item_container } = require('../../engine/pixi_containers');

const { Lootable       } = require('../../character/attributes/lootable');
const { Item           } = require('./item_model');

class Chest extends Item {
  constructor() {
    super('chest_full');
    this.name  = 'chest';

    this.sprite.width = 100;
    this.sprite.height= 50;
    this.add_component(new Lootable(this));

    item_container.addChild(this.sprite);
  }
}

module.exports = {
  Chest,
};
