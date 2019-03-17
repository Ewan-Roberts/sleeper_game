'use strict';
const PIXI = require('pixi.js');

const { enemy_container } = require('../../engine/pixi_containers');
class Influence {
  constructor() {
    this.name   = 'influence';
  }

  add_box(width, height) {
    this.texture = PIXI.Texture.fromImage('black_dot');
    this.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

    this.sprite = new PIXI.Sprite(this.texture);
    this.sprite.width  = width;
    this.sprite.height = height;
    this.sprite.anchor.set(0.5);
    this.sprite.alpha= 0.3;
    enemy_container.addChild(this.sprite);
  }

}

module.exports = {
  Influence,
};
