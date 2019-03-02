'use strict';

const { world } = require('../engine/shadows');
const { Tween } = require('../engine/tween');

class Camera {
  constructor() {
    this.sprite = world;

    this.add_component(new Tween(this.sprite));
  }

  add_component(component) { this[component.name] = component; }

  remove_component(name) { delete this[name]; }

  set_position({ x, y }) {
    this.sprite.position.set(x, y);
  }
}

module.exports = {
  Camera,
};
