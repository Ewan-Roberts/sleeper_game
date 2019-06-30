const { decals } = require('../../engine/pixi_containers');

const { Sprite, Texture } = require('pixi.js');

class Decal extends Sprite {
  constructor(data) {
    super(Texture.fromImage(data.image_name || 'bunny'));
    this.id       = data.id;
    this.height   = data.height || 20;
    this.width    = data.width  || 100;
    this.alpha    = data.properties && data.properties.alpha || 1;
    this.tint     = data.properties && data.properties.tint || 0xA9A9A9;
    this.rotation = data.rotation * (Math.PI/180) || 0;
    this.anchor.set(0, 1);
    this.position.copy(data);

    decals.addChild(this);
  }
}

module.exports = {
  Decal,
};



