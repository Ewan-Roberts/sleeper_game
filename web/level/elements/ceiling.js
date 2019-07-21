const { roofs } = require('../../engine/pixi_containers');
const { Sprite, Texture, DEG_TO_RAD } = require('pixi.js');
const { env } = require('../../../config');

class Roof extends Sprite {
  constructor(data) {
    super(Texture.fromImage(data.image_name));
    this.id     = data.id;
    this.height = data.height;
    this.width  = data.width;
    this.rotation = data.rotation * DEG_TO_RAD;
    this.tint     = data.tint  || 0xffffff;
    this.alpha    = data.alpha || env.brightness;

    this.anchor.set(0, 1);
    this.position.copy(data);

    roofs.addChild(this);
  }
}

module.exports = {
  Roof,
};
