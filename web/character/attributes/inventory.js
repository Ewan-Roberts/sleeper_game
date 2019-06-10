'use strict';
const { Item_Manager   } = require('../../items/item_manager');
const { View_Inventory } = require('../../view/view_inventory');
const { Fade           } = require('../../effects/fade');

class Inventory {
  constructor(sprite, properties) {
    this.name   = 'inventory';
    this.items  = [];
    this.equipped = null;
    this.inventory_view = new View_Inventory();
    if(properties){
      if(properties.equip)  this.equip(properties.equip);
      if(properties.random) this.populate();
      if(properties.items) {
        const item_array = JSON.parse(properties.items);
        this.items = this.populate_with(item_array);
      }
    }
    this.sprite = sprite;
  }

  set_position({x, y}) {
    this.inventory_view.set_position({x, y});
  }

  populate() {
    this.items = Item_Manager.get_random_items();

    this.inventory_view.populate_slots(this.items);
  }

  populate_with(items) {
    this.items = items.map(name => Item_Manager.get_item(name));

    this.inventory_view.populate_slots(this.items);
  }

  equip(name) {
    this.equipped = Item_Manager.get_item(name);
  }

  remove(id) {
    const index = this.items.findIndex(item => item.id === id);

    this.items.splice(index, 1);
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
    // getIndexof splice
    const result = this.items.map((item,i) => {
      if(item.name === name) {
        this.items.splice(i,1);
        return item;
      }
    }).filter(n => n);

    return result;
  }
}

module.exports = {
  Inventory,
};

