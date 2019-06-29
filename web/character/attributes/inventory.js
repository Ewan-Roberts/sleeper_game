'use strict';
const { Item_Manager   } = require('../../items/item_manager');
const { View_Inventory } = require('../../view/view_inventory');
const { Fade           } = require('../../effects/fade');

class Inventory extends View_Inventory {
  constructor(properties) {
    super();
    this.name   = 'inventory';
    this.items  = [];
    this.equipped = null;
    if(properties){
      if(properties.equip)  this.equip(properties.equip);
      if(properties.random) this.populate();
      if(properties.items) {
        const item_array = JSON.parse(properties.items);
        this.items = this.populate_with(item_array);
      }
    }
  }

  populate() {
    this.items = Item_Manager.get_random_items();

    this.populate_slots(this.items);
  }

  populate_with(items) {
    this.items = items.map(name => Item_Manager.get_item(name));

    this.populate_slots(this.items);
  }

  equip(name) {
    this.equipped = Item_Manager.get_item(name);
  }

  remove(id) {
    const index = this.items.findIndex(item => item.id === id);

    this.items.splice(index, 1);
  }

  fade_in() {
    this.slot_container.visible = true;
    Fade.in(this.slot_container);
  }

  hide() {
    Fade.out(this.slot_container);
  }

  clear() {
    this.clear_slots();
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
    const index = this.items.getIndexof(name);
    const result = this.items.splice(index,1);
    console.log(result);
    return result;
  }
}

module.exports = {
  Inventory,
};

