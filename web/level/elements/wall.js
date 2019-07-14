const { Sprite, Texture, DEG_TO_RAD } = require('pixi.js');
const { collisions      } = require('../../engine/pixi_containers');

class Wall extends Sprite {
  constructor(data) {
    super(Texture.WHITE);
    this.id       = data.id;
    this.height   = data.height;
    this.width    = data.width;
    this.rotation = data.rotation * DEG_TO_RAD;
    this.tint     = 0x000000;

    this.tint     = data.tint;
    this.alpha    = (data.hidden)?0:data.alpha || 1;

    this.anchor.set(0, 1);
    this.position.copy(data);

    collisions.addChild(this);
  }
}

module.exports = {
  Wall,
};


