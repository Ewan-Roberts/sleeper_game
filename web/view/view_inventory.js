'use strict';
const PIXI = require('pixi.js');
const { player_events } = require('../engine/item_handler');

const { visuals } = require('../engine/pixi_containers');
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

    visuals.addChild(this.slot_container);
  }

  clear_slots() {
    this.slot_container.removeChildren();
  }

  populate_slots(loot) {
    this.create_inventory_slots(loot.length);

    const item_title = new PIXI.Text('',{fontSize: 20, fill: 'grey'});
    item_title.y += 60;
    item_title.x -= 40;

    const item_title_background = new PIXI.Sprite(PIXI.Texture.WHITE);
    item_title_background.tint  = 0x29241F;
    item_title_background.width = this.slot_container.width;
    item_title_background.height = 35;
    item_title_background.y += 55;
    item_title_background.x -= 50;
    item_title_background.visible = false;

    const description = new PIXI.Text('',{
      wordWrap: true,
      wordWrapWidth: this.slot_container.width - 20,
      fontSize: 18,
    });
    description.y += 95;
    description.x -= 40;

    const description_background = new PIXI.Sprite(PIXI.Texture.WHITE);
    description_background.width = this.slot_container.width;
    description_background.y += 90;
    description_background.x -= 50;
    description_background.visible = false;

    const item_worth = new PIXI.Text('',{fontSize: 15, fill: 'white'});
    item_worth.x -= 40;

    loot.forEach((loot_item, slot) => {
      const item  = PIXI.Sprite.fromFrame(loot_item.image_name);
      // set to 100 when out of dev
      item.height = 500;
      item.width  = 500;
      item.anchor.set(0.5);
      item.interactive = true;
      item.buttonMode  = true;

      item.click = () => {
        player_events.emit('give_item', loot_item);
        item_title.text  = '';
        description.text = '';
        item_worth.text  = '';

        item_title_background.visible  = false;
        description_background.visible = false;
        item.destroy();
      };

      item.on('mouseover', () => {
        item_title_background.visible  = true;
        description_background.visible = true;

        item_title.text  = loot_item.visual_name;
        description.text = loot_item.description;
        description_background.height = description.height + 10;

        item_worth.text = 'Value: '+loot_item.cost;
        item_worth.y = description.height + 105;
      });

      this.slot_container.getChildAt(slot).addChild(item);
    });

    this.slot_container.addChild(
      item_title_background,
      description_background,
      item_title,
      description,
      item_worth
    );
  }
}

module.exports = {
  View_Inventory,
};
