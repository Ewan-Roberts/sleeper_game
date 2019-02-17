'use strict';

const { get_random_items } = require('../../items/item_data');
const { View_Inventory   } = require('../../view/view_inventory');
const { icon             } = require('../../view/view_icons');

class Lootable {
  constructor(entity) {
    this.name     = 'loot';
    this.entity   = entity;
    this.looted   = false;
    this.items    = [];
  }

  populate() {
    this.items = get_random_items();
  }

  create_icon() {
    const button = new icon('bunny', this.entity.sprite);

    button.element.on('click', () => {
      this.entity.sprite.buttonMode = false;
      this.looted = true;

      button.remove();
    });
  }

  show() {
    View_Inventory.create_populated_slots(this.entity.sprite, this.items);
  }
}

module.exports = {
  Lootable,
};
