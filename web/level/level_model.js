'use strict';
const PIXI = require('pixi.js');

const { background_container } = require('../engine/pixi_containers');

class Background {
  constructor(name) {
    this.sprite = PIXI.Sprite.fromFrame(name);
    this.sprite.anchor.set(0.5);
  }

  set_position({x, y}) {
    this.sprite.position.set(x, y);

    background_container.addChild(this.sprite);
  }
}

module.exports = {
  Background,
};
