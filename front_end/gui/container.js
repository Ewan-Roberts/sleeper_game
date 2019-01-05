'use strict';

const PIXI = require('pixi.js');

const viewport = require('../engine/viewport');

const padding = 1;
const box_size = 100-padding;

class GUI_Container {
  constructor(point) {
    this.container = new PIXI.Container();
    this.container.name = 'gui_container';
    this.container.zIndex = -8;

    this.sprite = PIXI.Sprite.fromFrame('black_dot');
    this.sprite.height = 100;
    this.sprite.width = 402;
    this.sprite.position.set(point.x + 250, point.y -20);
    this.sprite.anchor.set(0.5);
    this.sprite.name = 'background';
    this.sprite.interactive = true;
    this.sprite.buttonMode = true;

    this.container.addChild(this.sprite);
    viewport.addChild(this.container);
  }

  add_item_tiles() {
    const item_slot_1 = PIXI.Sprite.fromFrame('item_slot');
    item_slot_1.name = 'item_slot_1';
    item_slot_1.width = box_size;
    item_slot_1.height = box_size;
    item_slot_1.anchor.y = 0.5;
    item_slot_1.position.x = this.sprite.x-this.sprite.width/2 + padding;
    item_slot_1.position.y = this.sprite.y;

    const item_slot_2 = PIXI.Sprite.fromFrame('item_slot');
    item_slot_2.name = 'item_slot_2';
    item_slot_2.width = box_size;
    item_slot_2.height = box_size;
    item_slot_2.anchor.y = 0.5;
    item_slot_2.position.x = this.sprite.x-this.sprite.width/4 + padding;
    item_slot_2.position.y = this.sprite.y;

    const item_slot_3 = PIXI.Sprite.fromFrame('item_slot');
    item_slot_3.name = 'item_slot_3';
    item_slot_3.width = box_size;
    item_slot_3.height = box_size;
    item_slot_3.anchor.y = 0.5;
    item_slot_3.position.x = this.sprite.x + padding;
    item_slot_3.position.y = this.sprite.y;


    const item_slot_4 = PIXI.Sprite.fromFrame('item_slot');
    item_slot_4.name = 'item_slot_4';
    item_slot_4.width = box_size;
    item_slot_4.height = box_size;
    item_slot_4.anchor.y = 0.5;
    item_slot_4.position.x = this.sprite.x +this.sprite.width/4 + padding;
    item_slot_4.position.y = this.sprite.y;

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
