'use strict';
const PIXI = require('pixi.js');
const app  = require('./app');

class Image {
  constructor(name) {
    this.name = name;

    this.src = this._extract(name);
  }

  _extract(image_name) {
    const found_sprite = PIXI.Sprite.fromFrame(image_name);
    if(!found_sprite) throw new Error('nothing found for this');

    const image_from_spritesheet = app.renderer.plugins.extract.image(found_sprite);
    return image_from_spritesheet;
  }
}

module.exports = {
  Image,
};
