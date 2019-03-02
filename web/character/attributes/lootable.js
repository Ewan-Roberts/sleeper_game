'use strict';

const { Item_Manager   } = require('../../items/item_manager');
const { View_Inventory } = require('../../view/view_inventory');
const { icon           } = require('../../effects/view_icons');

class Lootable {
  constructor({ sprite }) {
    this.name     = 'loot';
    this.sprite   = sprite;
    this.looted   = false;
    this.items    = [];
  }

  populate() {
    this.items = Item_Manager.get_random_items();
  }

  create_icon() {
    const button = new icon('bunny', this.sprite);

    button.element.on('click', () => {
      this.sprite.buttonMode = false;
      this.looted = true;
      this.show();
      button.remove();
    });
  }

  take_items(items) {
    items.forEach(item => this.items.push(item));
  }

  show() {
    View_Inventory.create_populated_slots(this.sprite, this.items);
  }

  empty() {
    this.items = [];
  }
}

module.exports = {
  Lootable,
};
