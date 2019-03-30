'use strict';
const PIXI = require('pixi.js');

const { background_container } = require('../../engine/pixi_containers');

class Background {
  constructor(name) {
    //This is not pulled from the packer but from the level folder
    this.sprite = PIXI.Sprite.fromImage('level/'+name+'.png');

    this.sprite.anchor.set(0.5);
  }

  tile(name) {
    const texture = PIXI.Texture.fromImage('level/'+name+'.jpg');

    this.sprite = new PIXI.extras.TilingSprite(
      texture,
      5000,
      5000
    );
  }

  set_position({x, y}) {
    this.sprite.position.set(x, y);

    background_container.addChild(this.sprite);
  }

  set width(value) {
    this.sprite.width = value;
  }

  set height(value) {
    this.sprite.height = value;
  }

  set alpha(amount) {
    this.sprite.alpha = amount;
  }

  destroy() {
    background_container.removeChild(this.sprite);
  }
}

module.exports = {
  Background,
};
