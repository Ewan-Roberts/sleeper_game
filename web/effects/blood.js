'use strict';
const { Sprite, Texture } = require('pixi.js');
const { decals } = require('../engine/pixi_containers');
const { random_bound } = require('../utils/math.js');

const blood_options = ['Blood splatter 5-sc','Blood splatter 18-sc','Blood splatter 20-sc', 'round_floor_stain'];

const random_texture_name = () =>
  blood_options[Math.floor(Math.random()*blood_options.length)];

class Blood extends Sprite {
  constructor(data) {
    const random_blood_name = random_texture_name();
    super(Texture.fromImage(random_blood_name));
    this.width  /= 4;
    this.height /= 4;
    this.alpha  = 0.3;
    this.anchor.set(0, 0.5);
    this.position.copy(data);
    this.rotation = random_bound(0, 3);

    decals.addChild(this);
  }
}

module.exports = {
  Blood,
};
