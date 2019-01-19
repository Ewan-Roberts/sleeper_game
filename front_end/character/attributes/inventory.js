'use strict';

const PIXI = require('pixi.js');
const { viewport } = require('../../engine/viewport');

const {
  find_item_by_id,
  get_random_item_array,
} = require('../../data/item_data');

const gui_container = viewport.getChildByName('gui_container');
const box_size = 100;

class Inventory {
  constructor() {
    this.inventory = {};
    this.inventory.slots = [];
    this.inventory.equiped = undefined;
    this.inventory.sprite = PIXI.Sprite.fromFrame('black_dot');
    this.inventory.sprite.height = 100;
    this.inventory.sprite.width = 402;
    this.inventory.sprite.anchor.set(0.5);
    this.inventory.sprite.visible = false;
    gui_container.addChild(this.inventory.sprite);
    this.add_item_tiles();
  }

  hide() {
    this.inventory.sprite.visible = false;
    this.inventory.item_slot_0.visible  = false;
    this.inventory.item_slot_1.visible  = false;
    this.inventory.item_slot_2.visible  = false;
    this.inventory.item_slot_3.visible  = false;
    this.inventory.close_button.visible = false;
  }

  show() {
    this.inventory.sprite.visible = true;
    this.inventory.item_slot_0.visible  = true;
    this.inventory.item_slot_1.visible  = true;
    this.inventory.item_slot_2.visible  = true;
    this.inventory.item_slot_3.visible  = true;
    this.inventory.close_button.visible = true;
  }

  set_inventory_position(point) {
    this.show();
    this.inventory.sprite.position.set(point.x + 250, point.y -20);
    this.inventory.item_slot_0.position.x = this.inventory.sprite.x-this.inventory.sprite.width/2;
    this.inventory.item_slot_0.position.y = this.inventory.sprite.y;
    this.inventory.item_slot_1.position.x = this.inventory.sprite.x-this.inventory.sprite.width/4;
    this.inventory.item_slot_1.position.y = this.inventory.sprite.y;
    this.inventory.item_slot_2.position.x = this.inventory.sprite.x;
    this.inventory.item_slot_2.position.y = this.inventory.sprite.y;
    this.inventory.item_slot_3.position.x = this.inventory.sprite.x +this.inventory.sprite.width/4;
    this.inventory.item_slot_3.position.y = this.inventory.sprite.y;
    this.inventory.close_button.position.x = this.inventory.sprite.x +this.inventory.sprite.width/2 - 30;
    this.inventory.close_button.position.y = this.inventory.sprite.y -35;
  }

  add_item_tiles() {
    this.inventory.item_slot_0 = PIXI.Sprite.fromFrame('item_slot');
    this.inventory.item_slot_0.name = 'item_slot_0';
    this.inventory.item_slot_0.width = box_size;
    this.inventory.item_slot_0.height = box_size;
    this.inventory.item_slot_0.anchor.y = 0.5;

    this.inventory.item_slot_1 = PIXI.Sprite.fromFrame('item_slot');
    this.inventory.item_slot_1.name = 'item_slot_1';
    this.inventory.item_slot_1.width = box_size;
    this.inventory.item_slot_1.height = box_size;
    this.inventory.item_slot_1.anchor.y = 0.5;

    this.inventory.item_slot_2 = PIXI.Sprite.fromFrame('item_slot');
    this.inventory.item_slot_2.name = 'item_slot_2';
    this.inventory.item_slot_2.width = box_size;
    this.inventory.item_slot_2.height = box_size;
    this.inventory.item_slot_2.anchor.y = 0.5;

    this.inventory.item_slot_3 = PIXI.Sprite.fromFrame('item_slot');
    this.inventory.item_slot_3.name = 'item_slot_3';
    this.inventory.item_slot_3.width = box_size;
    this.inventory.item_slot_3.height = box_size;
    this.inventory.item_slot_3.anchor.y = 0.5;

    this.inventory.close_button = PIXI.Sprite.fromFrame('cancel_button');
    this.inventory.close_button.name = 'close_button';
    this.inventory.close_button.width = 30;
    this.inventory.close_button.height = 30;
    this.inventory.close_button.anchor.y = 0.5;
    this.inventory.close_button.interactive = true;
    this.inventory.close_button.buttonMode = true;
    this.inventory.close_button.click = () => {

      if(this.inventory.sprite.visible){
        this.hide();
        return;
      }

      this.show();
    };
    //todo move to under this container
    gui_container.addChild(
      this.inventory.item_slot_0,
      this.inventory.item_slot_1,
      this.inventory.item_slot_2,
      this.inventory.item_slot_3,
      this.inventory.close_button
    );

    this.hide();
  }


  populate_slot(item_details, slot) {

    const item = PIXI.Sprite.fromFrame(item_details.image_name);
    item.height = box_size+30;
    item.width = box_size+40;
    item.anchor.y = 0.5;
    item.anchor.x = -0.2;
    item.interactive = true;
    item.buttonMode = true;
    item.click = () => {
      item.destroy();
      // todo needs to be bound
      viewport.getChildByName('player').inventory.add_item(item_details);
    };

    //todo fix this madness
    this.inventory[`item_slot_${slot}`].addChild(item);
  }

  empty_slots() {
    this.inventory.slots = [];
  }

  add_item(item) {
    this.inventory.slots.push(item);
  }

  equip_item(item) {
    this.inventory.equiped = item;
  }

  get weapon_speed() {
    if(!this.inventory.equiped) {
      throw new Error('this character has no weapon equiped');
    }

    return this.inventory.equiped.speed;
;
  }

  get weapon_damage() {
    if(!this.inventory.equiped) {
      throw new Error('this character has no weapon equiped');
    }

    return this.inventory.equiped.damage;
  }

  randomise_slots() {
    this.inventory.slots = [];
  }

  populate_random_inventory() {
    this.inventory.slots  = get_random_item_array();

    this.inventory.slots.forEach((item, i) => {
      this.populate_slot(item, i);
    });
  }

  spike_populate_inventory() {
    const rat_meat = find_item_by_id(1);
    const rat_hide = find_item_by_id(2);

    this.inventory.slots.push(rat_meat, rat_hide);
    this.inventory.slots.forEach((item, i) => {
      this.populate_slot(item, i);
    });
  }

}

module.exports = {
  Inventory,
};

