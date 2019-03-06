'use strict';

const { Inventory          } = require('../../character/attributes/inventory');
const { cutscene_container } = require('../../engine/pixi_containers');
const { Item               } = require('./item_model');

class Chest extends Item {
  constructor() {
    super('chest_full');

    this.sprite.interactive = true;
    this.sprite.buttonMode = true;
    this.state = 'closed';
    // this.sprite.click = () => console.log('click');

    cutscene_container.addChild(this.sprite);
    this._add_state_handling();
  }

  _add_state_handling() {
    this.sprite.click = () => {
      switch(this.state) {
        case 'closed':
          this._open_inventory_box();
          break;
        case 'full':
          this._empty();
          break;
      }
    };
  }

  _open_inventory_box() {
    if(this.state === 'open') return;
    this.state = 'open';

    const inventory_box = new Inventory();
    inventory_box.add_item_tiles();
    inventory_box.populate_slot('bunny', 0);
    inventory_box.populate_slot('bunny', 1);
    inventory_box.populate_slot('bunny', 2);
    inventory_box.populate_slot('bunny', 3);
    this.sprite.addChild(inventory_box.container);
  }

  _empty() {
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
