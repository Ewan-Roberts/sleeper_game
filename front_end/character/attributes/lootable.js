'use strict';

const { get_random_items } = require('../../items/item_data');
const { View_Inventory   } = require('../../view/view_inventory');

class Lootable {
  constructor(entity) {
    this.name     = 'loot';
    this.entity   = entity;
    this.equipped = null;
    this.slots    = [];
    this.looted   = false;
  }

  show() {
    if(!this.looted) {
      this.loot = get_random_items();
    }

    this.entity.sprite.buttonMode = true;
    this.entity.sprite.on('click', () => {
      View_Inventory.create_populated_slots(this.entity.sprite, this.loot);

      this.entity.sprite.buttonMode = false;
      this.looted = true;

      console.log('looting corpse');
    });
  }

}

module.exports = {
  Lootable,
};
