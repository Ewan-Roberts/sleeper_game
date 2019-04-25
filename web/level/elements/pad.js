'use strict';
const PIXI = require('pixi.js');
const { pad_container } = require('../../engine/pixi_containers');
const event = require('events');

class Trigger_Pad {
  constructor(data) {
    this.area = new PIXI.Sprite(PIXI.Texture.WHITE);
    this.area.height = data.height;
    this.area.width  = data.width;
    this.area.alpha  = 0.3;
    this.area.anchor.set(0);
    this.area.position.set(data.x, data.y);
    this.area.events = new event({once: true});

    pad_container.addChild(this.area);
  }

  destroy() {
    pad_container.removeChild(this.area);
  }
}

module.exports = {
  Trigger_Pad,
};
