'use strict';
const { shrouds } = require('../../engine/pixi_containers');

const { Sprite, Texture } = require('pixi.js');

class Shroud extends Sprite {
  constructor(data) {
    super(Texture.fromImage(data.image_name));
    this.id       = data.id;
    this.height   = data.height;
    this.width    = data.width;
    this.alpha    = data.properties && data.properties.alpha || 1;
    // this.tint     = 0xA9A9A9;
    this.rotation        = data.rotation * (Math.PI/180);
    this.remove_on_enter = data.properties && data.properties.remove_on_enter;
    this.alpha_on_enter  = data.properties && data.properties.alpha_on_enter;
    this.anchor.set(0, 1);
    this.position.copy(data);

    shrouds.addChild(this);
  }
}

module.exports = {
  Shroud,
};
