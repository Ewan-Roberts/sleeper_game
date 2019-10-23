const { Texture, extras, DEG_TO_RAD } = require('pixi.js');
const { World } = require('../../engine/pixi_containers');

class Background extends extras.TilingSprite {
  constructor({
    width,
    height,
    rotation,
    image_name,
    alpha = 1,
    x,
    y,
  }) {
    super(Texture.fromImage(image_name));
    this.width  = width;
    this.height = height;
    this.alpha  = alpha;
    this.rotation = rotation * DEG_TO_RAD;
    this.anchor.set(0, 1);
    this.position.copy({ x, y });

    if(image_name === 'tile_floor') {
      this.tileScale.x = 0.10;
      this.tileScale.y = 0.10;
    }

    if(image_name === 'wood_floor') {
      this.tileScale.x = 0.6;
      this.tileScale.y = 0.7;
      this.tint        = 0x8c7a64;
    }

    if(image_name === 'white_tiles') {
      this.tileScale.y = 0.5;
      this.tileScale.x = 0.5;
    }

    if(image_name === 'wood_planks_vertical') {
      this.tileScale.x = 0.15;
      this.tileScale.y = 0.15;
      this.tint        = 0x8c7a64;
    }

    if(image_name === 'tile_concrete') {
      this.tileScale.x = 0.1;
      this.tileScale.y = 0.1;
      this.tint        = 0x303030;
    }

    if(image_name === 'tarmac_tile') {
      this.tint = 0xA9A9A9;
    }

    if(image_name === 'DirtCobble1_dgw-a') {
      this.tileScale.x = 0.7;
      this.tileScale.y = 0.7;
      this.tint = 0xA9A9A9;
    }

    if(image_name === 'road') {
      this.tileScale.x = 1.9;
    }

    World.add_to('background', this);
  }
}

module.exports = {
  Background,
};
