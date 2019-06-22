'use strict';
const { collisions      } = require('../../engine/pixi_containers');
const { Sprite, Texture } = require('pixi.js');

class Collision extends Sprite {
  constructor(data) {
    super(Texture.fromImage(data.image_name));
    this.id       = data.id;
    this.height   = data.height;
    this.width    = data.width;
    if(data.properties) {
      this.alpha    = data.properties.alpha;
    }
    this.rotation = data.rotation * (Math.PI/180);
    this.tint     = 0xA9A9A9;
    this.anchor.set(0, 1);

    collisions.addChild(this);
    this.position.copy(data);
  }
}

module.exports = {
  Collision,
};
