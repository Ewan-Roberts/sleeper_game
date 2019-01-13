'use strict';

const PIXI = require('pixi.js');
const viewport = require('../../engine/viewport');

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
    this.inventory.sprite = PIXI.Sprite.fromFrame('black_dot');
    this.inventory.sprite.height = 100;
    this.inventory.sprite.width = 402;
    this.inventory.sprite.anchor.set(0.5);
    this.inventory.sprite.visible = false;
    gui_container.addChild(this.inventory.sprite);
    this.add_item_tiles();
    this.populate_random_inventory();
  }

  hide() {
    this.inventory.sprite.visible       = false;
    this.item_slot_0.visible  = false;
    this.item_slot_1.visible  = false;
    this.item_slot_2.visible  = false;
    this.item_slot_3.visible  = false;
    this.close_button.visible = false;
  }

  show() {
    this.inventory.sprite.visible       = true;
    this.item_slot_0.visible  = true;
    this.item_slot_1.visible  = true;
    this.item_slot_2.visible  = true;
    this.item_slot_3.visible  = true;
    this.close_button.visible = true;
  }

  set_inventory_position(point) {
    this.show();
    this.inventory.sprite.position.set(point.x + 250, point.y -20);
    this.item_slot_0.position.x = this.inventory.sprite.x-this.inventory.sprite.width/2;
    this.item_slot_0.position.y = this.inventory.sprite.y;
    this.item_slot_1.position.x = this.inventory.sprite.x-this.inventory.sprite.width/4;
    this.item_slot_1.position.y = this.inventory.sprite.y;
    this.item_slot_2.position.x = this.inventory.sprite.x;
    this.item_slot_2.position.y = this.inventory.sprite.y;
    this.item_slot_3.position.x = this.inventory.sprite.x +this.inventory.sprite.width/4;
    this.item_slot_3.position.y = this.inventory.sprite.y;
    this.close_button.position.x = this.inventory.sprite.x +this.inventory.sprite.width/2 - 30;
    this.close_button.position.y = this.inventory.sprite.y -35;
  }

  add_item_tiles() {
    this.item_slot_0 = PIXI.Sprite.fromFrame('item_slot');
    this.item_slot_0.name = 'item_slot_0';
    this.item_slot_0.width = box_size;
    this.item_slot_0.height = box_size;
    this.item_slot_0.anchor.y = 0.5;

    this.item_slot_1 = PIXI.Sprite.fromFrame('item_slot');
    this.item_slot_1.name = 'item_slot_1';
    this.item_slot_1.width = box_size;
    this.item_slot_1.height = box_size;
    this.item_slot_1.anchor.y = 0.5;

    this.item_slot_2 = PIXI.Sprite.fromFrame('item_slot');
    this.item_slot_2.name = 'item_slot_2';
    this.item_slot_2.width = box_size;
    this.item_slot_2.height = box_size;
    this.item_slot_2.anchor.y = 0.5;

    this.item_slot_3 = PIXI.Sprite.fromFrame('item_slot');
    this.item_slot_3.name = 'item_slot_3';
    this.item_slot_3.width = box_size;
    this.item_slot_3.height = box_size;
    this.item_slot_3.anchor.y = 0.5;

    this.close_button = PIXI.Sprite.fromFrame('cancel_button');
    this.close_button.name = 'close_button';
    this.close_button.width = 30;
    this.close_button.height = 30;
    this.close_button.anchor.y = 0.5;
    this.close_button.interactive = true;
    this.close_button.buttonMode = true;
    this.close_button.click = () => {

      if(this.inventory.sprite.visible){
        this.hide();
        return;
      }

      this.show();
    };
    //todo move to under this container
    gui_container.addChild(
      this.item_slot_0,
      this.item_slot_1,
      this.item_slot_2,
      this.item_slot_3,
      this.close_button
    );

    this.hide();
  }

  lootable_on_death() {
    this.sprite.kill = () => {

      this.sprite.stop();
      this.sprite.interactive = true;
      this.sprite.buttonMode = true;
      this.sprite.texture = this.sprite.animations.dead;
      this.sprite.status = 'dead';

      const get_tween = PIXI.tweenManager.getTweensForTarget(this.sprite);
      if(get_tween[0]) {
        get_tween[0].stop();
      }

      this.lootable();
    };
  }

  lootable() {
    this.sprite.click = () => {
      //console.log(this.inventory)

      this.set_inventory_position(this.sprite);
    };
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
    this[`item_slot_${slot}`].addChild(item);
  }

  empty_slots() {
    this.inventory.slots = [];
  }

  add_item(item) {
    this.inventory.slots.push(item);
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

