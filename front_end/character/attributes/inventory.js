'use strict';

const { get_item } = require('../../items/item_data');

class Inventory {
  constructor() {
    this.name          = 'inventory';
    this.equipped      = null;
    this.ranged_weapon = null;
    this.melee_weapon  = null;
  }

  equip_weapon_by_name(name) {
    const weapon = get_item(name);

    this.equip_weapon(weapon);
  }

  add_ranged_weapon_by_name(name) {
    const weapon = get_item(name);

    this.ranged_weapon = weapon;
  }

  add_melee_weapon_by_name(name) {
    const weapon = get_item(name);

    this.melee_weapon = weapon;
  }

  equip_weapon(item) {
    if(!item.name) throw new Error('No weapon name for ' + item);

    this.equipped = item;
  }

  get equipped_weapon() {
    if(!this.equipped) throw new Error('No weapon equipped');
    if(!this.equipped.animation_name) throw new Error('No weapon animation for ' + this.equipped.name);

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

}

module.exports = {
  Inventory,
};

