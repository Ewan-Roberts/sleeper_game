'use strict';

const PIXI = require('pixi.js');

const { radian } = require('../utils/math');

class Character {
  constructor() {
    const texture = [PIXI.Texture.fromFrame('bunny')];

    this.sprite = new PIXI.extras.AnimatedSprite(texture);
  }

  add_component(component) {
    this[component.name] = component;
  }

  remove_component(name) {
    delete this[name];
  }

  //TODO This function should not live here
  face_sprite(sprite) {
    this.sprite.rotation = radian(this.sprite, sprite)+ this.sprite.rotation_offset;
  }

  set_position(point) {
    this.sprite.position.set(point.x, point.y);
  }
}

module.exports = {
  Character,
};


