'use strict';
const { Sprite   } = require('pixi.js');
const { renderer }  = require('./app');

class Image {
  constructor(name) {
    this.name = name;

    this.src = this._extract(name);
  }

  _extract(image_name) {
    const found_sprite = new Sprite.fromFrame(image_name);
    if(!found_sprite) throw new Error('nothing found for this');

    const image_from_spritesheet = renderer.plugins.extract.image(found_sprite);
    return image_from_spritesheet;
  }
}

module.exports = {
  Image,
};
