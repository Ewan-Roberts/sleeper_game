'use strict';

const PIXI = require('pixi.js');
const { viewport } = require('../engine/viewport');

const gui_container = viewport.getChildByName('gui_container');

class View_Inventory {
  static create_inventory_slots_at(point, slots) {
    this.slot_container = new PIXI.Container();
    this.slot_container.position.set(1000, 1000);

    for(let i = 0; i <= slots; i++) {
      const sprite  = PIXI.Sprite.fromFrame('item_slot');
      sprite.width  = 100;
      sprite.height = 100;
      sprite.x      = i * 100;
      sprite.anchor.set(0.5);

      this.slot_container.addChild(sprite);
    }

    gui_container.addChild(this.slot_container);
  }

  populate(image_name, slot) {
    const item  = PIXI.Sprite.fromFrame(image_name);
    item.height = 100;
    item.width  = 100;
    item.anchor.set(0.5);

    item.interactive = true;
    item.buttonMode  = true;
    item.click = () => {
      item.destroy();
    };

    this.slot_container.getChildAt(slot).addChild(item);
  }
}

module.exports = {
  View_Inventory,
};
