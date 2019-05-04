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
      Fade.out(this.slot_container);
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

    const level_text = new PIXI.Text('',{fontSize: 30, fill: 'grey'});
    level_text.anchor.set(0);
    level_text.y += 50;
    level_text.x -= 50;

    const description = new PIXI.Sprite(PIXI.Texture.WHITE);
    description.tint = 0x29241F;
    description.width = this.slot_container.width;
    description.height = level_text.height;
    description.anchor.set(0);
    description.height = 35;
    description.y += 50;
    description.x -= 50;

    loot.forEach((loot_item, slot) => {
      const item  = PIXI.Sprite.fromFrame(loot_item.image_name);
      item.height = 100;
      item.width  = 100;
      item.anchor.set(0.5);
      item.interactive = true;
      item.buttonMode  = true;
      item.info = loot_item;

      item.click = () => {
        player_events.emit('give_item', loot_item);

        item.destroy();
      };

      item.on('mouseover', () => {
        level_text.text = ' '+item.info.visual_name;
      });

      this.slot_container.getChildAt(slot).addChild(item);
    });

    this.slot_container.addChild(description, level_text);
  }
}

module.exports = {
  View_Inventory,
};
