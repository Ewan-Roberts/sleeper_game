const { Sprite, Texture, DEG_TO_RAD } = require('pixi.js');
const { pads } = require('../../engine/pixi_containers');
const { env  } = require('../../../config');

class Click_Pad extends Sprite {
  constructor(data) {
    super(Texture.WHITE);
    this.id       = data.id;
    this.height   = data.height;
    this.width    = data.width;
    this.rotation = data.rotation * DEG_TO_RAD;
    this.alpha    = (env.dev)?0.2:0;
    this.interactive = true;
    this.buttonMode  = true;
    this.anchor.set(0);
    this.tint  = 0xffff00;
    this.position.copy(data);

    pads.addChild(this);
  }
}

module.exports = {
  Click_Pad,
};
