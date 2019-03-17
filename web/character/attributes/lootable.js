'use strict';

const { Item_Manager   } = require('../../items/item_manager');
const { View_Inventory } = require('../../view/view_inventory');
const { Button         } = require('../../view/types/button');

class Lootable {
  constructor({ sprite }) {
    this.name   = 'loot';

    this.sprite = sprite;
    this.looted = false;
    this.items  = [];
  }

  populate() {
    this.items = Item_Manager.get_random_items();
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
    View_Inventory.create_populated_slots(this.sprite, this.items);
  }

  clear() {
    View_Inventory.clear_slots();
  }

  empty() {
    this.items = [];
  }
}

module.exports = {
  Lootable,
};
