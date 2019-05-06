'use strict';
const { Sprite, Texture} = require('pixi.js');
const { pads } = require('../../engine/pixi_containers');

const event = require('events');

class Click_Pad {
  constructor(data) {
    this.id = data.id;
    this.area = new Sprite(Texture.WHITE);
    this.area.height = data.height;
    this.area.width  = data.width;
    this.area.alpha  = 0.2;
    this.area.anchor.set(0);
    this.area.position.set(data.x, data.y);
    this.area.events = new event({once: true});

    pads.addChild(this.area);
  }

  set click(value) {
    this.area.interactive = true;
    this.area.buttonMode  = true;

    this.area.click = value;
  }

  destroy() {
    pads.removeChild(this.area);
  }
}

module.exports = {
  Click_Pad,
};
