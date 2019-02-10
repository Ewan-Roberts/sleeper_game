'use strict';

const { get_random_items } = require('../../items/item_data');

class Inventory {
  constructor() {
    this.name     = 'inventory';
    this.equiped = null;
    this.slots    = [];
  }

  equip_weapon(item) {
    this.equiped = item;
  }

  get equiped_weapon() {
    if(!this.equiped) {
      throw new Error('this character has no weapon equiped');
    }

    return this.equiped;
  }

  get weapon_speed() {
    if(!this.equiped) {
      throw new Error('this character has no weapon equiped');
    }

    return this.equiped.speed;
  }

  get weapon_damage() {
    if(!this.equiped) {
      throw new Error('this character has no weapon equiped');
    }

    return this.equiped.damage;
  }

  populate_random_inventory(max) {
    this.slots = get_random_items(max);
  }
}

module.exports = {
  Inventory,
};

