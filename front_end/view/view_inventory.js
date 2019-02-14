'use strict';

const PIXI = require('pixi.js');
const { gui_container } = require('../engine/pixi_containers');

class View_Inventory {

  static populate(image_name, slot) {
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

  static create_inventory_slots_at(point, slots = 3) {
    if(!point) throw new Error('needs a point: ' + point);

    this.slot_container = new PIXI.Container();
    this.slot_container.position.set(point.x + 200, point.y);

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

  static create_populated_slots(point, loot) {
    this.create_inventory_slots_at(point, loot.length);

    loot.forEach((item, i) => this.populate(item.image_name, i));
  }


}

module.exports = {
  View_Inventory,
};
