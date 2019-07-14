const { backgrounds     } = require('../../engine/pixi_containers');
const { Sprite, Texture, DEG_TO_RAD } = require('pixi.js');

class Floor extends Sprite {
  constructor(data) {
    super(Texture.fromImage(data.image_name || 'bunny'));
    this.id       = data.id;
    this.height   = data.height || 20;
    this.width    = data.width  || 100;
    this.alpha    = data.alpha || 1;
    this.tint     = data.tint || 0xffffff;
    this.rotation = data.rotation * DEG_TO_RAD;
    this.anchor.set(0, 1);
    this.position.copy(data);

    backgrounds.addChild(this);
  }
}

module.exports = {
  Floor,
};
