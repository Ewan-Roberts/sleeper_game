'use strict';
const PIXI = require('pixi.js');

const { background_container } = require('../../engine/pixi_containers');

class Background {
  constructor(data) {
    const texture = PIXI.Texture.fromImage(data.name);
    this.sprite = new PIXI.extras.TilingSprite(texture);
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

    this.sprite.alpha = 0.4;
    this.sprite.anchor.set(0);
    this.sprite.width  = data.width;
    this.sprite.height = data.height;

    this.set_position(data);
  }

  set_position({x, y}) {
    this.sprite.position.set(x, y);

    background_container.addChild(this.sprite);
  }
}

module.exports = {
  Background,
};
