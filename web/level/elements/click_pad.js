'use strict';
const PIXI = require('pixi.js');
const { pad_container } = require('../../engine/pixi_containers');

const event          = require('events');
const { Color_Pick } = require('../../utils/color_picker');

class Click_Pad {
  constructor() {
    this.area = new PIXI.Sprite(PIXI.Texture.WHITE);
    this.area.alpha = 0.1;
    this.area.anchor.set(0.5);
    this.area.events = new event({once: true});

    pad_container.addChild(this.area);
  }

  set height(value) {
    this.area.height = value;
  }

  set width(value) {
    this.area.width = value;
  }

  set alpha(value) {
    this.area.alpha = value;
  }

  set click(value) {
    this.area.interactive = true;
    this.area.buttonMode  = true;

    this.area.click = value;
  }
  set anchor(value) {
    this.area.anchor.set(value);
  }

  set_position({x,y}) {
    this.area.position.set(x,y);
  }

  box(value) {
    this.area.width  = value;
    this.area.height = value;
  }

  set tint(name) {
    this.area = Color_Pick.get_hex_from(name);
  }

  destroy() {
    pad_container.removeChild(this.area);
  }
}

module.exports = {
  Click_Pad,
};
