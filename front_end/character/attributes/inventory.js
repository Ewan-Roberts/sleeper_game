'use strict';

const { get_random_items, get_item } = require('../../items/item_data');

class Inventory {
  constructor() {
    this.name     = 'inventory';
    this.equipped = null;
    this.slots    = [];
  }

  equip_weapon_by_name(name) {
    const weapon = get_item(name);

    this.equip_weapon(weapon);
  }

  equip_weapon(item) {
    if(!item.name) throw new Error('No weapon name for ' + item);

    this.equipped = item;
  }

  get equipped_weapon() {
    if(!this.equipped) throw new Error('No weapon equipped');
    if(!this.equipped.animation_name) throw new Error('No weapon aniamtion for ' + this.eqipped.name);

    return this.equipped;
  }

  get ammo_type() {
    if(!this.equipped) throw new Error('No weapon equipped');

    if(!this.equipped.ammo) throw new Error('Weapon does not have an ammo type: ' + this.equipped);

    return this.equipped.ammo;
  }

  get equipped_weapon_name() {
    if(!this.equipped) throw new Error('No weapon equipped');

    return this.equipped.name;
  }

  get weapon_speed() {
    if(!this.equipped) throw new Error('No weapon equipped');

    return this.equipped.speed;
  }

  get weapon_damage() {
    if(!this.equipped) throw new Error('No weapon equipped');

    return this.equipped.damage;
  }

  populate_random_inventory(max) {
    this.slots = get_random_items(max);
  }
}

module.exports = {
  Inventory,
};

