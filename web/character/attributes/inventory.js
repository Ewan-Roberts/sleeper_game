const { Item_Manager   } = require('../../items/item_manager');
const { View_Inventory } = require('../../view/view_inventory');
const { Fade           } = require('../../effects/fade');

class Inventory extends View_Inventory {
  constructor({ random, equip, items } = {}) {
    super();
    this.name     = 'inventory';
    this.items    = random ? Item_Manager.get_random_items() : [];
    this.equipped = equip ? Item_Manager.get_item(equip) : null;
    if(!items) {
      return;
    }
    this.items = JSON.parse(items).map(
      ({ name, condition }) => Item_Manager.get_item(name, { condition })
    );

    this.populate();
  }

  populate() {
    if(this.items.length === 0) {
      return;
    }
    this.populate_slots(this.items);
  }

  contains(name) {
    return this.items.some(item => item.name === name);
  }

  populate_with_items(items) {
    this.items.concat(
      items.map(name => Item_Manager.get_item(name))
    );

    this.populate();
  }

  populate_with_item(name,
    {
      condition,
    }
    = {}
  ) {
    const item = Item_Manager.get_item(name, { condition });
    this.items.push(item);

    this.populate();
  }

  // TODO: rename create and give
  give_item_by_name(name,
    {
      condition,
    }
    = {}
  ) {
    const item = Item_Manager.get_item(name, { condition });
    this.items.push(item);
  }

  equip(name) {
    this.equipped = Item_Manager.get_item(name);
  }

  find_by_name(name) {
    const found_item = this.items.find(item => item.name === name);

    return found_item;
  }

  remove_by_name(name) {
    const index = this.items.findIndex(item => item.name === name);

    this.items.splice(index, 1);
  }

  remove(id) {
    const index = this.items.findIndex(item => item.id === id);

    this.items.splice(index, 1);
  }

  fade_in() {
    this.slot_container.renderable = true;
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

  give(item) {
    if(!item) {
      throw 'can not give nothing';
    }
    this.items.push(item);
  }

  take_by_name(name) {
    const index = this.items.findIndex(item => item.name === name);
    if(index < 0) {
      return undefined;
    }

    const [ result ] = this.items.splice(index, 1);
    return result;
  }
}

module.exports = {
  Inventory,
};
