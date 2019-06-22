'use strict';
const { Texture, extras } = require('pixi.js');

const { backgrounds } = require('../../engine/pixi_containers');

class Background extends extras.TilingSprite {
  constructor(data) {
    super(Texture.fromImage(data.image_name));
    this.alpha  = 0.3;
    this.width  = data.width;
    this.height = data.height;
    this.anchor.set(0,1);
    this.position.copy(data);

    if(data.image_name === 'tile_floor') {
      this.tileScale.x = 0.15;
      this.tileScale.y = 0.15;
    }

    if(data.image_name === 'wood_floor') {
      this.tileScale.x = 0.6;
      this.tileScale.y = 0.7;
      this.tint        = 0x8c7a64;
      this.alpha       = 0.8;
    }

    if(data.image_name === 'white_tiles') {
      this.tileScale.y = 0.5;
      this.tileScale.x = 0.5;
      this.alpha       = 0.8;
    }

    if(data.image_name === 'wood_planks_vertical') {
      this.tileScale.x = 0.15;
      this.tileScale.y = 0.15;
      this.alpha       = 0.8;
      this.tint        = 0x8c7a64;
    }
    if(data.image_name === 'tile_concrete') {
      this.tileScale.x = 0.1;
      this.tileScale.y = 0.1;
    }
    if(data.image_name === 'carpet_floor') {
      this.alpha = 1;
    }
    if(data.image_name === 'tarmac_tile') {
      this.alpha = 0.8;
      this.tint  = 0xA9A9A9;
    }

    backgrounds.addChild(this);
  }
}

module.exports = {
  Background,
};
