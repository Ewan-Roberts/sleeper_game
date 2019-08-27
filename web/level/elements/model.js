const { Sprite, Texture, DEG_TO_RAD } = require('pixi.js');
const { env } = require('../../../config');

class Element extends Sprite {
  constructor({
    image_name = 'bunny',
    id,
    height,
    width,
    rotation,
    tint  = 0xffffff,
    alpha = env.brightness,
    hidden,
    x,
    y,
  }) {
    super(Texture.fromImage(image_name || 'bunny'));
    this.id       = id;
    this.height   = height;
    this.width    = width;
    this.rotation = rotation * DEG_TO_RAD;
    this.tint     = tint;
    this.alpha    = alpha;
    this.visible  = !hidden;
    this.anchor.set(0, 1);
    this.position.copy({x,y});
  }
}

module.exports = {
  Element,
};
