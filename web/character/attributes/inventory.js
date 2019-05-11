'use strict';
const { Item_Manager   } = require('../../items/item_manager');
const { View_Inventory } = require('../../view/view_inventory');
const { Button         } = require('../../view/button');
const { Fade           } = require('../../effects/fade');

class Inventory {
  constructor({ properties, sprite } = {}) {
    this.name = 'inventory';

    if(properties && properties.equip) {
      this.equip(properties.equip);
    } else {
      this.equipped = null;
    }

    this.ranged_weapon = null;
    this.melee_weapon  = null;
    this.items         = [];
    this.sprite = sprite;
    this.looted = false;
    this.items  = [];
    this.inventory_view = new View_Inventory();
  }

  set_position({x, y}) {
    this.inventory_view.set_position({x, y});
  }

  populate() {
    this.items = Item_Manager.get_random_items();

    this.inventory_view.populate_slots(this.items);
  }

  populate_with(items) {
    items.forEach(name => {
      const found_item = Item_Manager.get_item(name);

      this.items.push(found_item);
    });

    this.inventory_view.populate_slots(this.items);
  }

  create_icon() {
    const prompt = new Button('bunny');
    prompt.set_position(this.sprite);
    prompt.sprite.on('click', () => {
      this.sprite.buttonMode = false;
      this.looted = true;
      this.show();

      prompt.remove();
    });
  }

  equip(name) {
    this.equipped = Item_Manager.get_item(name);
  }

  show() {
    this.set_position(this.sprite);

    Fade.in(this.inventory_view.slot_container);
  }

  hide() {
    Fade.out(this.inventory_view.slot_container);
  }

  clear() {
    this.inventory_view.clear_slots();
  }

  empty() {
    this.items = [];
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
    this.ranged_weapon = Item_Manager.get_item(name);
  }

  add_melee_weapon_by_name(name) {
    this.melee_weapon = Item_Manager.get_item(name);
  }
}

module.exports = {
  Inventory,
};

