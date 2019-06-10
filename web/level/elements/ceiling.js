'use strict';
const { roofs } = require('../../engine/pixi_containers');
const { Sprite, Texture } = require('pixi.js');

class Roof extends Sprite {
  constructor(data) {
    super(Texture.fromImage(data.image_name));
    this.id     = data.id;
    this.height = data.height;
    this.width  = data.width;
    this.rotation = data.rotation * (Math.PI/180);
    this.alpha    = data.properties && data.properties.alpha || 1;
    this.anchor.set(0, 1);
    this.position.copy(data);

    roofs.addChild(this);
  }
}

module.exports = {
  Roof,
};
