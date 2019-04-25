'use strict';
const PIXI = require('pixi.js');

const { background_container } = require('../../engine/pixi_containers');

class Background {
  constructor(data, tile_image) {
    if(tile_image) {
      const texture = PIXI.Texture.fromImage('level/'+data.name+'.jpg');
      this.sprite = new PIXI.extras.TilingSprite(texture);
      this.sprite.alpha = 0.4;
    } else {
      const image_name = data.name || 'grid_floor';

      this.sprite = PIXI.Sprite.fromImage('level/'+image_name+'.png');
    }
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
