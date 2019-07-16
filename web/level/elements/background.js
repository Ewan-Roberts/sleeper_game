const { Texture, extras } = require('pixi.js');
const { backgrounds     } = require('../../engine/pixi_containers');

class Background extends extras.TilingSprite {
  constructor(data) {
    const { width, height, image_name } = data;
    super(Texture.fromImage(image_name));
    this.width  = width;
    this.height = height;
    this.anchor.set(0,1);
    this.position.copy(data);

    this.alpha = data.alpha || 1;
    if(image_name === 'tile_floor') {
      this.tileScale.x = 0.15;
      this.tileScale.y = 0.15;
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

    backgrounds.addChild(this);
  }
}

module.exports = {
  Background,
};
