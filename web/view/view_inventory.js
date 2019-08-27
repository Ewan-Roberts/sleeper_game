const {Text,Sprite,Container,Texture}= require('pixi.js');
const { guis          } = require('../engine/pixi_containers');
const { item_events   } = require('../engine/item_handler');
const { Fade          } = require('../effects/fade');

class Slot extends Sprite {
  constructor() {
    super(Texture.fromFrame('item_slot'));

    this.width  = 80;
    this.height = 80;
    this.anchor.set(0.5);
  }
}

class Title extends Text {
  constructor() {
    super('', {fontSize: 18, fill: 'grey'});
    this.y += 48;
    this.x -= 30;
    this.visible = false;

    this.background = new Sprite(Texture.WHITE);
    this.background.tint  = 0x29241F;
    this.background.height = 35;
    this.background.y += 40;
    this.background.x -= 40;
    this.background.visible = false;
  }

  set width(value) {
    this.background.width = value;
  }

  show() {
    this.background.visible = true;
    this.visible = true;
  }

  hide() {
    this.background.visible = false;
    this.visible = false;
  }
}

class Description extends Text{
  constructor() {
    super('',{
      fontSize: 15,
      fill: 'white',
    });
    this.y += 76;
    this.x -= 40;
    this.visible = false;
  }

  set width(value) {
    this.wordWrap = true;
    this.wordWrapWidth = value - 20;
  }
}

class Item extends Sprite {
  constructor({image_name}) {
    super(Texture.fromFrame(image_name));
    this.height = 250;
    this.width  = 250;
    this.anchor.set(0.5);
    this.interactive = true;
    this.buttonMode  = true;

    if(image_name === 'empty_image') {
      this.interactive = false;
      this.buttonMode  = false;
    }
  }
}

class View_Inventory {
  constructor() {
    this.slot_container = new Container();
    this.slot_container.interactive = true;
    this.slot_container.buttonMode  = true;
    this.slot_container.on('mouseout', () => {
      Fade.out(this.slot_container);
    });
    this.slots = [];
  }

  set_position({x, y}) {
    this.slot_container.position.set(x, y);
  }

  create_inventory_slots(slots = 3) {
    for(let i = 0; i <= slots; i++) {
      const slot = new Slot();
      slot.x = i * 80;
      this.slot_container.addChild(slot);
      this.slots.push(slot);
    }

    guis.addChild(this.slot_container);
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

    loot.forEach((loot_item, slot) => {
      const item = new Item(loot_item);
      item.click = () => {
        console.log('click');
        console.log(loot_item);
        item_events.emit('give', 1, { item: loot_item });
        description.visible = false;
        title.hide();
        item.destroy();
      };

      item.on('mouseover', () => {
        item.visible = true;
        title.show();
        description.visible = true;
        description.text = loot_item.description;

        title.text = loot_item.visual_name;
      });

      this.slot_container.getChildAt(slot).addChild(item);
    });

    this.slot_container.addChild(
      title.background,
      title,
      description
    );
  }
}

module.exports = {
  View_Inventory,
};
