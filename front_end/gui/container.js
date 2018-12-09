'use strict';

const PIXI = require('pixi.js');
//const io = require('socket.io-client');
//const viewport = require('../engine/viewport.js');

const padding = 1;
const box_size = 100-padding;

class GUI_Container {
  constructor() {
    this.container = new PIXI.Container();
    this.container.name = 'gui_container';
    this.container.zIndex = -8;

    this.sprite = PIXI.Sprite.fromFrame('black_dot');
    this.sprite.height = 100;
    this.sprite.width = 402;
    this.sprite.position.x = 200;
    this.sprite.anchor.set(0.5);
    this.sprite.name = 'background';
    this.sprite.interactive = true;
    this.sprite.buttonMode = true;

    this.container.addChild(this.sprite);
  }

  add_item_tiles() {
    const item_slot_1 = PIXI.Sprite.fromFrame('item_slot');
    item_slot_1.name = 'item_slot_1';
    item_slot_1.width = box_size;
    item_slot_1.height = box_size;
    item_slot_1.anchor.y = 0.5;
    item_slot_1.position.x = this.sprite.x-this.sprite.width/2 + padding;

    const item_slot_2 = PIXI.Sprite.fromFrame('item_slot');
    item_slot_2.name = 'item_slot_2';
    item_slot_2.width = box_size;
    item_slot_2.height = box_size;
    item_slot_2.anchor.y = 0.5;
    item_slot_2.position.x = this.sprite.x-this.sprite.width/4 + padding;

    const item_slot_3 = PIXI.Sprite.fromFrame('item_slot');
    item_slot_3.name = 'item_slot_3';
    item_slot_3.width = box_size;
    item_slot_3.height = box_size;
    item_slot_3.anchor.y = 0.5;
    item_slot_3.position.x = this.sprite.x + padding;

    const item_slot_4 = PIXI.Sprite.fromFrame('item_slot');
    item_slot_4.name = 'item_slot_4';
    item_slot_4.width = box_size;
    item_slot_4.height = box_size;
    item_slot_4.anchor.y = 0.5;
    item_slot_4.position.x = this.sprite.x +this.sprite.width/4 + padding;

    this.container.addChild(item_slot_1, item_slot_2, item_slot_3, item_slot_4);
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
  GUI_Container,
};
