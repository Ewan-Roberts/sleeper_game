'use strict';

const PIXI = require('pixi.js');
const viewport = require('../../engine/viewport.js');

const container = new PIXI.Container();
container.name = 'item_container'; //todo
container.zIndex = -6;
viewport.addChild(container);


class Campfire {
  constructor({ x, y }) {
    this.image_state = {
      smoldering:  PIXI.Texture.fromFrame('campfire'),
    };

    this.sprite = new PIXI.Sprite(this.image_state.smoldering);
    this.sprite.position.set(x, y);

    this.sprite.anchor.set(0.5);
    this.sprite.zIndex = -5;
    this.sprite.name = 'campfire';
    this.sprite.interactive = true;
    this.sprite.buttonMode = true;
    this.sprite.on('pointerdown', this.drag_start);
    this.sprite.on('pointerup', this.drag_end);
    this.sprite.on('pointermove', this.drag_move);
    this.state = 'closed';
    this.placed = false;

    container.addChild(this.sprite);
  }

  drag_start(event) {
    if(this.placed) {
      this.click();
      return;
    }

    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
  }

  drag_end() {
    this.data = null;
    this.alpha = 1;
    this.dragging = false;
    this.placed = true;
  }

  drag_move() {
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
