'use strict';

const PIXI = require('pixi.js');
const { Item } = require('./item_model');

class Campfire extends Item {
  constructor() {
    super();
    this.image_state = {
      smoldering:  PIXI.Texture.fromFrame('campfire'),
    };

    this.sprite = new PIXI.Sprite(this.image_state.smoldering);
    this.sprite.anchor.set(0.5);
    this.sprite.zIndex = -5;
    this.sprite.name = 'campfire';
    this.state = 'closed';
    this.placed = false;

  }

  drag_start(event) {
    this.sprite.interactive = true;
    this.sprite.buttonMode = true;
    this.sprite.on('pointerdown', this.drag_start);
    if(this.placed) {
      this.click();
      return;
    }

    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
  }

  drag_end() {
    this.sprite.interactive = true;
    this.sprite.buttonMode = true;
    this.sprite.on('pointerup', this.drag_end);
    this.data = null;
    this.alpha = 1;
    this.dragging = false;
    this.placed = true;
  }

  drag_move() {
    this.sprite.interactive = true;
    this.sprite.buttonMode = true;
    this.sprite.on('pointermove', this.drag_move);
    if(this.dragging) {
      const new_position = this.data.getLocalPosition(this.parent);
      this.x = new_position.x;
      this.y = new_position.y;
    }
  }

  add_state_handling() {
    this.sprite.click = () => {
      console.log('open menu');
    };
  }
}

module.exports = {
  Campfire,
};
