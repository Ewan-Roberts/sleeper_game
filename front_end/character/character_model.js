'use strict';

const PIXI = require('pixi.js');

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

  set_position(point) {
    this.sprite.position.set(point.x, point.y);
  }
}

module.exports = {
  Character,
};


