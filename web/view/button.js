'use strict';

const PIXI = require('pixi.js');

const { visual_effects_container } = require('../engine/pixi_containers');

class Button {
  constructor(image) {
    this.name = 'button';

    this.sprite = PIXI.Sprite.fromFrame(image);
    this.sprite.anchor.set(0.5);
    this.sprite.alpha  = 1;
    this.sprite.height = 50;
    this.sprite.width  = 50;
    this.sprite.interactive = true;
    this.sprite.buttonMode = true;
    this.sprite.zIndex = -9;

    visual_effects_container.addChild(this.sprite);
  }

  set_position({x, y}) {
    this.sprite.position.set(x, y);
  }

  remove() {
    visual_effects_container.removeChild(this.sprite);
  }
}

module.exports = {
  Button,
};
