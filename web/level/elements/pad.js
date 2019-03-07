'use strict';
const PIXI = require('pixi.js');

const event        = require('events');
const { pad_container } = require('../../engine/pixi_containers');

class Trigger_Pad {
  constructor() {
    this.area = new PIXI.Sprite(PIXI.Texture.WHITE);
    this.area.alpha = 0.1;
    this.area.anchor.set(0.5);
    this.area.events = new event();

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


  set_position({x,y}) {
    this.area.position.set(x,y);
  }

  box(value) {
    this.area.width  = value;
    this.area.height = value;
  }

  set tint(color) {
    switch(color) {
      case 'red'    : this.area.tint = 0xff0000; break;
      case 'yellow' : this.area.tint = 0xbdb76b; break;
      case 'white'  : this.area.tint = 0xffffff; break;
      case 'green'  : this.area.tint = 0x008000; break;
      case 'grey'   : this.area.tint = 0xd3d3d3; break;
    }
  }

  destroy() {
    pad_container.removeChild(this.area);
  }
}

module.exports = {
  Trigger_Pad,
};
