'use strict';

const { world } = require('../engine/shadows');

class Camera {
  constructor() {
    this.sprite = world;
  }

  set_position(x, y) {
    world.position.set(x, y);
  }
}

module.exports = {
  Camera,
};
