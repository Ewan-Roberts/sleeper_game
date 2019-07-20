const { Item_Manager   } = require('../../items/item_manager');
const { View_Inventory } = require('../../view/view_inventory');
const { Fade           } = require('../../effects/fade');

class Inventory extends View_Inventory {
  constructor(data = {}) {
    super();
    this.name   = 'inventory';
    this.items  =  data.random?Item_Manager.get_random_items():[];
    this.equipped = data.equip?Item_Manager.get_item(data.equip):null;
    if(data.items) {
      this.items = JSON.parse(data.items).map(name =>
        Item_Manager.get_item(name));
      this.populate();
    }
  }

  populate_with_random_items() {
    this.items = Item_Manager.get_random_items();

    this.populate_slots(this.items);
  }

  populate() {
    if(this.items.length === 0) return;
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

