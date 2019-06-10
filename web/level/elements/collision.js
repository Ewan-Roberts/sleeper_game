'use strict';
const { collisions      } = require('../../engine/pixi_containers');
const { Sprite, Texture } = require('pixi.js');

class Collision extends Sprite {
  constructor(data) {
    super(Texture.fromImage(data.image_name));
    this.id       = data.id;
    this.height   = data.height;
    this.width    = data.width;
    this.alpha    = data.alpha || 1;
    this.tint     = 0xA9A9A9;
    this.rotation = data.rotation * (Math.PI/180);
    this.anchor.set(0, 1);

    collisions.addChild(this);
    this.position.copy(data);
  }
}

module.exports = {
  Collision,
};
