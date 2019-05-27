'use strict';

const { collisions } = require('../../engine/pixi_containers');
const { Inventory  } = require('../../character/attributes/inventory');
const { Item       } = require('./item_model');

class Shrine extends Item {
  constructor(options) {
    super(options);
    this.inventory = new Inventory();

    collisions.addChild(this.sprite);
  }

  give_blood(vial) {
    console.log(vial);
    if(vial) this.inventory.give_item(vial);
  }

  get enough_blood() {
    console.log('feed me blood');

    return (this.inventory.size > 1);
  }
}

module.exports = {
  Shrine,
};
