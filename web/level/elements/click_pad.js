const { Sprite, Texture } = require('pixi.js');
const { Level_Factory } = require('../types/level_factory');
const { pads } = require('../../engine/pixi_containers');

const event = require('events');

class Click_Pad extends Sprite {
  constructor(data) {
    super(Texture.WHITE);
    this.id       = data.id;
    this.height   = data.height;
    this.width    = data.width;
    this.rotation = data.rotation * (Math.PI/180);
    this.alpha    = (global.env === 'dev')?0.2:0;
    this.interactive = true;
    this.buttonMode  = true;
    this.anchor.set(0);
    this.position.copy(data);
    this.tint  = 0xffff00;

    pads.addChild(this);
  }
}

module.exports = {
  Click_Pad,
};
