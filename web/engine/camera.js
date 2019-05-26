'use strict';

const { world } = require('./shadows');

class Camera {
  constructor() {
    this.name = 'camera';
    this.sprite = world;
  }

  add_component(component) {
    this[component.name] = component;
  }

  remove_component(name) {
    delete this[name];
  }

  set_position({ x, y }) {
    this.sprite.position.set(-x, -y);
  }

  static set_center({ x, y }) {
    world.position.set(
      -x + global.window.innerWidth/2,
      -y + global.window.innerHeight/2
    );
  }
}

module.exports = {
  Camera,
};
