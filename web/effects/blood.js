'use strict';
const { Sprite, Texture } = require('pixi.js');
const { visuals } = require('../engine/pixi_containers');

class Blood extends Sprite {
  constructor(data) {
    super(Texture.fromImage('round_floor_stain'));
    this.width  /= 4;
    this.height /= 4;
    this.alpha  = 0.3;
    this.anchor.set(0.5);
    this.position.copy(data);

    visuals.addChild(this);
  }
}

module.exports = {
  Blood,
};
