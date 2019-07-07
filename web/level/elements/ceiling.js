const { roofs } = require('../../engine/pixi_containers');
const { Sprite, Texture, DEG_TO_RAD } = require('pixi.js');

class Roof extends Sprite {
  constructor(data) {
    super(Texture.fromImage(data.image_name));
    this.id     = data.id;
    this.height = data.height;
    this.width  = data.width;
    this.rotation = data.rotation * DEG_TO_RAD;
    this.tint     = data.properties && data.properties.tint || 0xffffff;
    this.alpha    = data.properties && data.properties.alpha || 1;
    this.anchor.set(0, 1);
    this.position.copy(data);

    roofs.addChild(this);
  }
}

module.exports = {
  Roof,
};
