'use strict';

const { collisions    } = require('../../engine/pixi_containers');
const { damage_events } = require('../../engine/damage_handler');
const { Inventory     } = require('../../character/attributes/inventory');
const { Item          } = require('./item_model');

class Shrine extends Item {
  constructor(options) {
    super(options);
    this.inventory = new Inventory();
    const on_damage = ({id}) => {
      if(this.id !== id) return;
      console.log('you can not hit a shrine');
      damage_events.removeListener('damage', on_damage);
    };
    damage_events.on('damage', on_damage);

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
