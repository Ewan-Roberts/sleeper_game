'use strict';
const PIXI = require('pixi.js');

const { background_container } = require('../../engine/pixi_containers');

class Background {
  constructor(data) {
    //This is not pulled from the packer but from the level folder
    this.sprite = PIXI.Sprite.fromImage('level/'+data.name+'.png');
    this.sprite.anchor.set(0);
    this.sprite.width = data.width;
    this.sprite.height = data.height;
    this.sprite.alpha = 0.5;

    this.set_position(data);
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
