'use strict';

// types:
// weopons
// food doing
// materials
// armour

const PIXI = require('pixi.js');
const viewport = require('../../engine/viewport');

const padding = 1;
const box_size = 100-padding;

const inventory_top_section = global.document.querySelector('.inventory_top_section');
const { find_item_by_id } = require('../../data/item_data');

class Inventory {
  constructor() {
    this.slots = [];
    this.maximum_slots = 4;
    this.sprite = PIXI.Sprite.fromFrame('black_dot');
    this.sprite.height = 100;
    this.sprite.width = 402;
    this.sprite.anchor.set(0.5);
    this.sprite.name = 'background';
    this.sprite.interactive = true;
    this.sprite.buttonMode = true;
    this.sprite.visible = false;
    viewport.getChildByName('gui_container').addChild(this.sprite);
    this.add_item_tiles();
    this.spike_populate_inventory();
  }

  hide() {

    this.sprite.visible       = false;
    this.item_slot_0.visible  = false;
    this.item_slot_1.visible  = false;
    this.item_slot_2.visible  = false;
    this.item_slot_3.visible  = false;
    this.close_button.visible = false;

  }

  show() {

    this.sprite.visible       = true;
    this.item_slot_0.visible  = true;
    this.item_slot_1.visible  = true;
    this.item_slot_2.visible  = true;
    this.item_slot_3.visible  = true;
    this.close_button.visible = true;

  }

  set_position(point) {
    this.show();
    this.sprite.position.set(point.x + 250, point.y -20);
    this.item_slot_0.position.x = this.sprite.x-this.sprite.width/2 + padding;
    this.item_slot_0.position.y = this.sprite.y;
    this.item_slot_1.position.x = this.sprite.x-this.sprite.width/4 + padding;
    this.item_slot_1.position.y = this.sprite.y;
    this.item_slot_2.position.x = this.sprite.x + padding;
    this.item_slot_2.position.y = this.sprite.y;
    this.item_slot_3.position.x = this.sprite.x +this.sprite.width/4 + padding;
    this.item_slot_3.position.y = this.sprite.y;
    this.close_button.position.x = this.sprite.x +this.sprite.width/2 - 30;
    this.close_button.position.y = this.sprite.y -35;
  }

  get open() {
    return this.sprite.visible;
  }

  add_item_tiles() {
    this.item_slot_0 = PIXI.Sprite.fromFrame('item_slot');
    this.item_slot_0.name = 'item_slot_0';
    this.item_slot_0.width = box_size;
    this.item_slot_0.height = box_size;
    this.item_slot_0.anchor.y = 0.5;
    this.item_slot_0.position.x = this.sprite.x-this.sprite.width/2 + padding;
    this.item_slot_0.position.y = this.sprite.y;

    this.item_slot_1 = PIXI.Sprite.fromFrame('item_slot');
    this.item_slot_1.name = 'item_slot_1';
    this.item_slot_1.width = box_size;
    this.item_slot_1.height = box_size;
    this.item_slot_1.anchor.y = 0.5;
    this.item_slot_1.position.x = this.sprite.x-this.sprite.width/4 + padding;
    this.item_slot_1.position.y = this.sprite.y;

    this.item_slot_2 = PIXI.Sprite.fromFrame('item_slot');
    this.item_slot_2.name = 'item_slot_2';
    this.item_slot_2.width = box_size;
    this.item_slot_2.height = box_size;
    this.item_slot_2.anchor.y = 0.5;
    this.item_slot_2.position.x = this.sprite.x + padding;
    this.item_slot_2.position.y = this.sprite.y;

    this.item_slot_3 = PIXI.Sprite.fromFrame('item_slot');
    this.item_slot_3.name = 'item_slot_3';
    this.item_slot_3.width = box_size;
    this.item_slot_3.height = box_size;
    this.item_slot_3.anchor.y = 0.5;
    this.item_slot_3.position.x = this.sprite.x +this.sprite.width/4 + padding;
    this.item_slot_3.position.y = this.sprite.y;

    this.close_button = PIXI.Sprite.fromFrame('cancel_button');
    this.close_button.name = 'close_button';
    this.close_button.width = 30;
    this.close_button.height = 30;
    this.close_button.anchor.y = 0.5;
    this.close_button.position.x = this.sprite.x +this.sprite.width/2 - 30;
    this.close_button.position.y = this.sprite.y -35;
    this.close_button.interactive = true;
    this.close_button.buttonMode = true;
    this.close_button.click = () => {

      if(this.sprite.visible){
        this.sprite.visible = false;
        this.item_slot_0.visible = false;
        this.item_slot_1.visible = false;
        this.item_slot_2.visible = false;
        this.item_slot_3.visible = false;
        this.close_button.visible = false;
        return;
      }

      this.sprite.visible = true;

      console.log('thing');
    };

    viewport.getChildByName('gui_container').addChild(this.item_slot_0, this.item_slot_1, this.item_slot_2, this.item_slot_3, this.close_button);
  }

  populate_slot(slot, item_details) {

    const item = PIXI.Sprite.fromFrame(item_details.image_name);
    item.height = box_size;
    item.width = box_size;
    item.anchor.y = 0.5;
    item.anchor.x = -0.5;
    item.interactive = true;
    item.buttonMode = true;
    item.click = () => {
      item.destroy();
    };

    viewport.getChildByName('gui_container').getChildByName(`item_slot_${slot}`).addChild(item);
  }

  fill_dom_slot(item) {
    inventory_top_section.children[item.slot].innerHTML = '';
    const elem = global.document.createElement('img');
    elem.setAttribute('height', '90');
    elem.setAttribute('width', '90');
    // todo: need to get from spritesheet
    elem.src = `images/${item.name}.png`;
    inventory_top_section.children[item.slot].appendChild(elem);
  }

  empty_slots() {
    this.slots = [];
  }

  randomise_slots() {
    this.slots = [];
  }

  spike_populate_inventory() {
    const rat_meat = find_item_by_id(1);
    const rat_hide = find_item_by_id(2);

    this.slots.push(rat_meat, rat_hide);
    this.slots.forEach((item, i) => {
      this.populate_slot(i, item);
    });
  }

  add_item(item) {

    this.slot.push(item);
  }

  drop_item() {

  }

}

module.exports = {
  Inventory,
};

