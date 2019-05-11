'use strict';

const { Item_Manager   } = require('../../items/item_manager');
const { View_Inventory } = require('../../view/view_inventory');
const { Button         } = require('../../view/button');
const { Fade           } = require('../../effects/fade');

class Lootable {
  constructor({ sprite }) {
    this.name   = 'loot';

    this.sprite = sprite;
    this.looted = false;
    this.items  = [];
    this.inventory = new View_Inventory();
  }

  set_position({x, y}) {
    this.inventory.set_position({x, y});
  }

  populate() {
    this.items = Item_Manager.get_random_items();

    this.inventory.populate_slots(this.items);
  }

  populate_with(items) {
    items.forEach(name => {
      const found_item = Item_Manager.get_item(name);

      this.items.push(found_item);
    });

    this.inventory.populate_slots(this.items);
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

  take_items(items) {
    items.forEach(item => this.items.push(item));
  }

  show() {
    this.set_position(this.sprite);
    Fade.in(this.inventory.slot_container);
  }

  hide() {
    Fade.out(this.inventory.slot_container);
  }

  clear() {
    this.inventory.clear_slots();
  }

  empty() {
    this.items = [];
  }
}

module.exports = {
  Lootable,
};
