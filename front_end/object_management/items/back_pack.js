'use strict';

const PIXI = require('pixi.js');

const { Item } = require('./item_model');

class Backpack extends Item {
  constructor() {
    super();

    const texture = PIXI.Texture.fromFrame('back_pack');
    this.sprite = new PIXI.Sprite(texture);

    this.sprite.anchor.set(0.5);
    this.sprite.zIndex = -5;
    this.sprite.name = 'backpack';
    this.sprite.interactive = true;
    this.sprite.buttonMode = true;

  }

}

module.exports = {
  Backpack,
};
