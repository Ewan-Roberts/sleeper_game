'use strict';

const { get_random_items } = require('../../items/item_data');

class Inventory {
  constructor() {
    this.name     = 'inventory';
    this.equipped = null;
    this.slots    = [];
  }

  equip_weapon(item) {
    this.equipped = item;
  }

  get equipped_weapon() {
    if(!this.equipped) {
      throw new Error('this character has no weapon equipped');
    }

    return this.equipped;
  }

  get weapon_speed() {
    if(!this.equipped) {
      throw new Error('this character has no weapon equipped');
    }

    return this.equipped.speed;
  }

  get weapon_damage() {
    if(!this.equipped) {
      throw new Error('this character has no weapon equipped');
    }

    return this.equipped.damage;
  }

  populate_random_inventory(max) {
    this.slots = get_random_items(max);
  }
}

module.exports = {
  Inventory,
};

