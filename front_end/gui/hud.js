'use strict';

const PIXI = require('pixi.js');
const viewport = require('../engine/viewport.js');

const padding = 1;
const box_size = 100-padding;
const container = new PIXI.Container();
container.name = 'gui_container';
container.zIndex = -50;
viewport.addChild(container);

class GUI_HUD {
  constructor() {
    this.sprite = PIXI.Sprite.fromFrame('black_dot');
    this.sprite.width = 500;
    this.sprite.height = viewport.worldHeight;
    this.sprite.anchor.set(1);
    this.sprite.name = 'inventory_background';
    this.sprite.interactive = true;
    this.sprite.buttonMode = true;
    this.sprite.zIndex = -60;
    this.sprite.alpha = 1;
    this.add_character_tile();
    console.log(this.sprite)
    container.addChild(this.sprite);
  }

  update_location() {
    this.sprite.position.y = viewport.bottom;
    this.sprite.position.x = viewport.right;
  }

  show() {
    this.sprite.alpha = 1;
  }

  hide() {
    this.sprite.alpha = 0;
  }

  add_character_tile() {
    const character_tile = PIXI.Sprite.fromFrame('item_slot');
    character_tile.name = 'character_tile';
    character_tile.width = 100;
    character_tile.height = 140;
    character_tile.zIndex = -60;
    character_tile.alpha = 1;
    character_tile.y = -150;
    character_tile.x = -150;
    console.log(this.sprite);
    //character_tile.position.x = this.sprite.x-this.sprite.width/2 + padding;

    this.sprite.addChild(character_tile);
  }

  populate_slot_1(name) {
    const item = PIXI.Sprite.fromFrame(name);
    item.height = box_size;
    item.width = box_size;
    item.anchor.y = 0.5;
    item.anchor.x = -0.5;
    item.interactive = true;
    item.buttonMode = true;
    item.click = () => {
      item.destroy();
    };

    this.container.getChildByName('item_slot_1').addChild(item);
  }

  populate_slot_2(name) {
    const item = PIXI.Sprite.fromFrame(name);
    item.height = box_size;
    item.width = box_size;
    item.anchor.y = 0.5;
    item.anchor.x = -0.5;
    item.interactive = true;
    item.buttonMode = true;
    item.click = () => {
      item.destroy();
    };

    this.container.getChildByName('item_slot_2').addChild(item);
  }

  populate_slot_3(name) {
    const item = PIXI.Sprite.fromFrame(name);
    item.height = box_size;
    item.width = box_size;
    item.anchor.y = 0.5;
    item.anchor.x = -0.5;
    item.interactive = true;
    item.buttonMode = true;
    item.click = () => {
      item.destroy();
    };

    this.container.getChildByName('item_slot_3').addChild(item);
  }

  populate_slot_4(name) {
    const item = PIXI.Sprite.fromFrame(name);
    item.height = box_size;
    item.width = box_size;
    item.anchor.y = 0.5;
    item.anchor.x = -0.5;
    item.interactive = true;
    item.buttonMode = true;
    item.click = () => {
      item.destroy();
    };

    this.container.getChildByName('item_slot_4').addChild(item);
  }
}

module.exports = {
  GUI_HUD,
};
