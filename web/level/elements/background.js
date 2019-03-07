'use strict';
const PIXI = require('pixi.js');

const { background_container } = require('../../engine/pixi_containers');

class Background {
  constructor(name) {
    this.sprite = PIXI.Sprite.fromFrame(name);
    this.sprite.anchor.set(0.5);
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