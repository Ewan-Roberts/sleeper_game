'use strict';

const PIXI = require('pixi.js');

const { Inventory } = require('../character/attributes/inventory');
const { Item } = require('./item_model');

class Chest extends Item {
  constructor() {
    super();
    this.image_cache = {
      state: {
        full:   PIXI.Texture.fromFrame('chest_full'),
        empty:  PIXI.Texture.fromFrame('chest_empty'),
      },
    };
    this.sprite = new PIXI.Sprite(this.image_cache.state.full);
    this.sprite.anchor.set(0.5);
    this.sprite.name = 'chest';
    this.sprite.height *= 2;
    this.sprite.width *= 2;
    this.sprite.interactive = true;
    this.sprite.buttonMode = true;
    this.state = 'closed';
    this.sprite.hitable_with_arrow = false;

  }

  add_state_handling() {
    this.sprite.click = () => {
      switch(this.state) {
        case 'closed':
          this.open_inventory_box();
          break;
        case 'full':
          this.empty();
          break;
      }
    };
  }

  open_inventory_box() {
    if(this.state === 'open') {
      return;
    }
    this.state = 'open';

    const inventory_box = new Inventory();
    inventory_box.add_item_tiles();
    inventory_box.populate_slot(1,'bunny');
    inventory_box.populate_slot(2,'bunny');
    inventory_box.populate_slot(3,'bunny');
    inventory_box.populate_slot(4,'bunny');
    this.sprite.addChild(inventory_box.container);
  }

  empty() {
    this.sprite.texture = this.image_cache.state.empty;
    this.state = 'empty';
    return this;
  }

  fill() {
    this.sprite.texture = this.image_cache.state.full;
    this.state = 'full';
    return this;
  }
}

module.exports = {
  Chest,
};
