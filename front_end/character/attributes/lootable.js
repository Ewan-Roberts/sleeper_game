'use strict';

const { get_random_items } = require('../../items/item_data');
const { View_Inventory   } = require('../../view/view_inventory');
const { icon             } = require('../../cutscene/icons');

class Lootable {
  constructor(entity) {
    this.name     = 'loot';
    this.entity   = entity;
    this.equipped = null;
    this.looted   = false;
    this.items    = [];
  }

  populate() {
    this.items = get_random_items();
  }

  create_icon() {
    const icon1 = new icon('bunny', this.entity.sprite);
    icon1.icon.on('click', () => {
      this.entity.sprite.buttonMode = false;
      this.looted = true;

      icon1.remove();
    });
  }

  show() {
    View_Inventory.create_populated_slots(this.entity.sprite, this.items);
  }

  get() {
    return this.items;
  }

}

module.exports = {
  Lootable,
};
