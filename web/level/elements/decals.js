const { decals } = require('../../engine/pixi_containers');
const { Sprite, Texture, DEG_TO_RAD } = require('pixi.js');

class Decal extends Sprite {
  constructor(data) {
    super(Texture.fromImage(data.image_name || 'bunny'));
    this.id       = data.id;
    this.height   = data.height || 20;
    this.width    = data.width  || 100;
    this.alpha    = data.alpha || 1;
    this.tint     = data.tint || 0xA9A9A9;
    this.rotation = data.rotation * DEG_TO_RAD || 0;
    this.anchor.set(0, 1);
    this.position.copy(data);

    decals.addChild(this);
  }
}

module.exports = {
  Decal,
};



