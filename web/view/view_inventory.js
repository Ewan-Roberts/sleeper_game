const {Text,Sprite,Container,Texture}= require('pixi.js');
const { guis          } = require('../engine/pixi_containers');
const { Fade          } = require('../effects/fade');

class Slot extends Sprite {
  constructor() {
    super(Texture.fromFrame('item_slot'));

    this.width  = 80;
    this.height = 80;
    this.anchor.set(0.5);
  }
}

class Title extends Text{
  constructor() {
    super('', {fontSize: 20, fill: 'grey'});
    this.y += 50;
    this.x -= 30;
    this.visible = false;

    this.background = new Sprite(Texture.WHITE);
    this.background.tint  = 0x29241F;
    this.background.height = 35;
    this.background.y += 45;
    this.background.x -= 40;
    this.background.visible = false;
  }

  set width(value) {
    this.background.width = value;
  }

  set visible(value) {
    if(!this.background) return;
    this.background.visible = value;
    super.visible = value;
  }
}

class Description extends Text{
  constructor() {
    super('',{
      fontSize: 15,
      fill: 'white',
    });
    this.y += 85;
    this.x -= 35;
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
    this.slot_container.on('mouseout', () => Fade.out(this.slot_container));
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
        //player_events.emit('give_item', loot_item);
        description.visible = false;
        title.visible = false;
        item.destroy();
      };

      item.on('mouseover', () => {
        item.visible = true;
        title.visible = true;
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
