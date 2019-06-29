'use strict';
const { collisions      } = require('../../engine/pixi_containers');
const { Sprite, Texture } = require('pixi.js');

class Collision extends Sprite {
  constructor(data) {
    super(Texture.fromImage(data.image_name));
    this.id       = data.id;
    this.height   = data.height;
    this.width    = data.width;
    this.alpha    = data.properties && data.properties.alpha || 1;
    this.rotation = data.rotation * (Math.PI/180);
    this.tint     = 0xA9A9A9;
    this.anchor.set(0, 1);
    this.position.copy(data);

    collisions.addChild(this);
  }
}

module.exports = {
  Collision,
};
