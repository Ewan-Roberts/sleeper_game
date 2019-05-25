'use strict';
const { Sprite, Texture } = require('pixi.js');
const { pads } = require('../../engine/pixi_containers');

class Click_Pad {
  constructor(data) {
    this.id = data.id;
    this.sprite = new Sprite(Texture.WHITE);
    this.sprite.height = data.height;
    this.sprite.width  = data.width;
    this.sprite.alpha  = 0.2;
    this.sprite.anchor.set(0);
    this.sprite.position.set(data.x, data.y);

    pads.addChild(this.sprite);
  }

  set click(value) {
    this.sprite.interactive = true;
    this.sprite.buttonMode  = true;

    this.sprite.click = value;
  }

  destroy() {
    pads.removeChild(this.sprite);
  }
}

module.exports = {
  Click_Pad,
};
