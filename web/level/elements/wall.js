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

    const {properties} = data;
    if(properties) {
      this.tint     = properties.tint;
      this.alpha    = (properties.hidden)?0:properties.alpha || 1;
    }

    this.anchor.set(0, 1);
    this.position.copy(data);

    collisions.addChild(this);
  }
}

module.exports = {
  Wall,
};


