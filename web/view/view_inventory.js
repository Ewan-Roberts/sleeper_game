'use strict';
const {Text,Sprite,Container,Texture}= require('pixi.js');
const { player_events } = require('../engine/item_handler');
const { visuals       } = require('../engine/pixi_containers');
const { Fade          } = require('../effects/fade');

class Slot {
  constructor() {
    this.sprite  = new Sprite.fromFrame('item_slot');
    this.sprite.width  = 100;
    this.sprite.height = 100;
    this.sprite.anchor.set(0.5);
  }

}

class Value {
  constructor() {
    this.sprite = new Text('',{fontSize: 15, fill: 'white'});
    this.sprite.x -= 40;
    this.sprite.visible = false;
  }

  set visible(value) {
    this.sprite.visible = value;
  }

  set text(value) {
    this.sprite.text = 'Value: '+value;
  }
}

class Title {
  constructor() {
    this.sprite = new Text('',{fontSize: 20, fill: 'grey'});
    this.sprite.y += 60;
    this.sprite.x -= 40;
    this.sprite.visible = false;

    this.background = new Sprite(Texture.WHITE);
    this.background.tint  = 0x29241F;
    this.background.height = 35;
    this.background.y += 55;
    this.background.x -= 50;
    this.background.visible = false;
  }

  set width(value) {
    this.background.width = value;
  }

  set visible(value) {
    this.background.visible = value;
    this.sprite.visible = value;
  }

  set text(value) {
    this.sprite.text = value;
  }
}

class Description {
  constructor() {
    this.sprite = new Text('',{fontSize: 18});
    this.sprite.y += 95;
    this.sprite.x -= 40;
    this.sprite.visible = false;

    this.background = new Sprite(Texture.WHITE);
    this.background.tint  = 0x29241F;
    this.background.height = 35;
    this.background.y += 90;
    this.background.x -= 50;
    this.background.visible = false;
  }

  set width(value) {
    this.background.width = value;
    this.sprite.wordWrap = true;
    this.sprite.wordWrapWidth = value - 20;
  }

  set height(value) {
    this.background.height = value;
  }

  set visible(value) {
    this.background.visible = value;
    this.sprite.visible = value;
  }

  set text(value) {
    this.sprite.text = value;
  }
}

class Item {
  constructor({image_name}) {
    this.sprite = Sprite.fromFrame(image_name);
    this.sprite.height = 500;
    this.sprite.width  = 500;
    this.sprite.anchor.set(0.5);
    this.sprite.interactive = true;
    this.sprite.buttonMode  = true;
  }

  set click(func) {
    this.sprite.click = func;
  }

  destroy() {
    this.sprite.destroy();
  }
}


class View_Inventory {
  constructor() {
    this.slot_container = new Container();
    this.slot_container.interactive = true;
    this.slot_container.on('mouseout', () => Fade.out(this.slot_container));
    this.slots = [];
  }

  set_position({x, y}) {
    this.slot_container.position.set(x, y);
  }

  create_inventory_slots(slots = 3) {
    for(let i = 0; i <= slots; i++) {
      const slot = new Slot();
      slot.sprite.x = i * 100;
      this.slot_container.addChild(slot.sprite);
      this.slots.push(slot);
    }

    visuals.addChild(this.slot_container);
  }

  clear_slots() {
    this.slot_container.removeChildren();
  }

  populate_slots(loot) {
    this.create_inventory_slots(loot.length);
    const title = new Title();
    title.width = this.slot_container.width;
    const description = new Description();
    description.width = this.slot_container.width;
    const value = new Value();

    loot.forEach((loot_item, slot) => {
      const item = new Item(loot_item);
      item.click = () => {
        player_events.emit('give_item', loot_item);
        description.visible = false;
        value.visible = false;
        title.visible = false;
        item.destroy();
      };

      item.sprite.on('mouseover', () => {
        title.visible = true;
        description.visible = true;
        description.text = loot_item.description;
        description.height += 10;

        title.text = loot_item.visual_name;
        value.text = loot_item.cost;
        value.sprite.y = description.sprite.height + 105;
      });

      this.slot_container.getChildAt(slot).addChild(item.sprite);
    });

    this.slot_container.addChild(
      title.background,
      description.background,
      title.sprite,
      description.sprite,
      value.sprite
    );
  }
}

module.exports = {
  View_Inventory,
};
