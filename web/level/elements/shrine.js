const { collisions } = require('../../engine/pixi_containers');
const { Inventory  } = require('../../character/attributes/inventory');
const { Element    } = require('./model');

class Shrine extends Element {
  constructor(data) {
    super(data);
    this.inventory   = new Inventory();
    this.interactive = true;

    collisions.addChild(this);
  }

  give_blood(vial) {
    if(vial) this.inventory.give_item(vial);
  }

  get enough_blood() {
    return (this.inventory.size > 1);
  }
}

module.exports = {
  Shrine,
};
