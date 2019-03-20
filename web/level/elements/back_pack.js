'use strict';
const { item_container } = require('../../engine/pixi_containers');

const { Lootable       } = require('../../character/attributes/lootable');
const { Item           } = require('./item_model');

class Backpack extends Item {
  constructor() {
    super('back_pack');
    this.name  = 'back_pack';

    this.sprite.width = 50;
    this.sprite.height = 80;
    this.add_component(new Lootable(this));

    item_container.addChild(this.sprite);
  }
}

module.exports = {
  Backpack,
};
