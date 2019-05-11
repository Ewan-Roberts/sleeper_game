'use strict';
const { Item_Manager } = require('../../items/item_manager');

class Inventory {
  constructor({ equip } = {}) {
    this.name = 'inventory';

    if(equip) {
      this.equipped = Item_Manager.get_item(equip);
    } else {
      this.equipped = null;
    }

    this.ranged_weapon = null;
    this.melee_weapon  = null;
    this.items         = [];
  }

  equip_weapon_by_name(name) {
    const weapon = Item_Manager.get_item(name);

    this.equipped = weapon;
  }

  arm_ranged(name) {
    this.equipped = Item_Manager.get_item(name);
    this.ranged_weapon = Item_Manager.get_item(name);
  }

  switch_to_ranged_weapon() {
    if(!this.ranged_weapon) throw new Error('no ranged weapon equipped');

    this.equipped = this.ranged_weapon;
  }

  switch_to_melee_weapon() {
    if(!this.melee_weapon) throw new Error('no melee weapon equipped');

    this.equipped = this.melee_weapon;
  }

  get size() {
    return this.items.length;
  }

  equip_weapon(weapon) {
    this.equipped = weapon;
  }

  give_item(item) {
    this.items.push(item);
  }

  take_items(name) {
    // return array of things you want remove them from items
    const result = this.items.map((item,i) => {
      if(item.name === name) {
        this.items.splice(i,1);
        return item;
      }
    }).filter(n => n);

    return result;
  }


  add_ranged_weapon_by_name(name) {
    const weapon = Item_Manager.get_item(name);

    this.ranged_weapon = weapon;
  }

  add_melee_weapon_by_name(name) {
    const weapon = Item_Manager.get_item(name);

    this.melee_weapon = weapon;
  }

  get ammo_type() {
    if(!this.equipped) throw new Error('no weapon equipped');
    if(!this.equipped.ammo) throw new Error('does not have an ammo type: ' + this.equipped);

    return this.equipped.ammo;
  }

  get weapon_speed() {
    if(!this.equipped) throw new Error('no weapon equipped');

    return this.equipped.speed;
  }

  get weapon_damage() {
    if(!this.equipped) throw new Error('no weapon equipped');

    return this.equipped.damage;
  }
}

module.exports = {
  Inventory,
};

