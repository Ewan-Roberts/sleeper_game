'use strict';

const { get_random_items } = require('../../items/item_data');
const { View_Inventory   } = require('../../view/view_inventory');
const { icon             } = require('../../cutscene/icons');

class Lootable {
  constructor(entity) {
    this.name     = 'loot';
    this.entity   = entity;
    this.equipped = null;
    this.slots    = [];
    this.looted   = false;
  }

  show() {
    if(!this.looted) {
      this.loot = get_random_items();

      icon.add_image_at('bunny', this.entity.sprite);
    }

    this.entity.sprite.interactive = true;
    this.entity.sprite.buttonMode = true;
    this.entity.sprite.on('click', () => {
      View_Inventory.create_populated_slots(this.entity.sprite, this.loot);

      this.entity.sprite.buttonMode = false;
      this.looted = true;

      icon.remove();
    });
  }
}

module.exports = {
  Lootable,
};
