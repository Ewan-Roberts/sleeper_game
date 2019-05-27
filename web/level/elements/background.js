'use strict';
const { Texture, extras } = require('pixi.js');

const { backgrounds } = require('../../engine/pixi_containers');

class Background {
  constructor(data) {
    const texture = Texture.fromImage(data.name);
    this.sprite = new extras.TilingSprite(texture);
    this.sprite.anchor.x = 0;
    this.sprite.anchor.y = 1;
    this.sprite.alpha = 0.4;
    if(data.name === 'tile_floor') {
      this.sprite.tileScale.x = 0.15;
      this.sprite.tileScale.y = 0.15;
    }

    if(data.name === 'wood_floor') {
      this.sprite.tileScale.x = 0.6;
      this.sprite.tileScale.y = 0.6;
    }
    if(data.name === 'tile_concrete') {
      this.sprite.tileScale.x = 0.1;
      this.sprite.tileScale.y = 0.1;
    }
    if(data.name === 'carpet_floor') {
      this.sprite.alpha = 1;
    }
    if(data.name === 'tarmac_tile') {
      // this.sprite.tileScale.x = 0.1;
      // this.sprite.tileScale.y = 0.1;
      this.sprite.alpha = 0.8;
      this.sprite.tint = 0xA9A9A9;
    }

    this.sprite.width  = data.width;
    this.sprite.height = data.height;

    this.set_position(data);
  }

  set_position({x, y}) {
    this.sprite.position.set(x, y);

    backgrounds.addChild(this.sprite);
  }
}

module.exports = {
  Background,
};
