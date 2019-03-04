'use strict';
const PIXI = require('pixi.js');

const { radian, distance_between_points } = require('../utils/math');

class Character {
  constructor() {
    const texture = [PIXI.Texture.fromFrame('bunny')];
    this.util = {};
    this.util.face_point = (point) => {
      this.sprite.rotation = radian(point, this.sprite) + this.sprite.rotation_offset;
    };

    this.sprite = new PIXI.extras.AnimatedSprite(texture);
  }

  add_component(component) {
    this[component.name] = component;
  }

  remove_component(name) {
    delete this[name];
  }

  set_position({x, y}) {
    this.sprite.position.set(x, y);
  }

  //TODO This needs to be lower level
  distance_to(sprite) {
    return distance_between_points(sprite, this.sprite);
  }

}

module.exports = {
  Character,
};


