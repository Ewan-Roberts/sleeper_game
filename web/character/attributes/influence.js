'use strict';
const { Texture, SCALE_MODES, Sprite } = require('pixi.js');

const { enemys } = require('../../engine/pixi_containers');
class Influence {
  constructor() {
    this.name   = 'influence';
  }

  add_box(width, height) {
    this.texture = Texture.fromImage('black_dot');
    this.texture.baseTexture.scaleMode = SCALE_MODES.NEAREST;

    this.sprite = new Sprite(this.texture);
    this.sprite.width  = width;
    this.sprite.height = height;
    this.sprite.anchor.set(0.5);
    this.sprite.alpha = 0.3;
    enemys.addChild(this.sprite);
  }

}

module.exports = {
  Influence,
};
