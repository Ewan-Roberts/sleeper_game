'use strict';
const PIXI = require('pixi.js');
const { player_events } = require('../engine/item_handler');

const { visual_effects_container } = require('../engine/pixi_containers');
const { Fade } = require('../effects/fade');

class View_Inventory {
  constructor() {
    this.slot_container = new PIXI.Container();
    this.slot_container.interactive = true;

    this.slot_container.on('mouseout', () => {
      const fade = new Fade(this.slot_container);
      fade.out();
    });
  }

  set_position({x, y}) {
    this.slot_container.position.set(x, y);
  }

  create_inventory_slots(slots = 3) {
    for(let i = 0; i <= slots; i++) {
      const sprite  = PIXI.Sprite.fromFrame('item_slot');
      sprite.width  = 100;
      sprite.height = 100;
      sprite.x      = i * 100;
      sprite.anchor.set(0.5);

      this.slot_container.addChild(sprite);
    }

    visual_effects_container.addChild(this.slot_container);
  }

  clear_slots() {
    this.slot_container.removeChildren();
  }

  populate_slots(loot) {
    this.create_inventory_slots(loot.length);

    loot.forEach((loot_item, slot) => {
      const item  = PIXI.Sprite.fromFrame(loot_item.image_name);
      item.height = 100;
      item.width  = 100;
      item.anchor.set(0.5);
      item.interactive = true;
      item.buttonMode  = true;
      item.click = () => {
        console.log(item);
        player_events.emit('give_item', loot_item);

        item.destroy();
      };

      this.slot_container.getChildAt(slot).addChild(item);
    });
  }
}

module.exports = {
  View_Inventory,
};
