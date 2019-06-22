'use strict';
const { borders         } = require('../../engine/pixi_containers');
const { Sprite, Texture } = require('pixi.js');

class Border extends Sprite {
  constructor(data) {
    super(Texture.fromImage(data.image_name));
    this.id       = data.id;
    this.height   = data.height;
    this.width    = data.width;
    this.alpha    = 0;
    this.rotation = data.rotation * (Math.PI/180);
    this.anchor.set(0, 1);

    borders.addChild(this);
    this.position.copy(data);
  }
}

module.exports = {
  Border,
};
