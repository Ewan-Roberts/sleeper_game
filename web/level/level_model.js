'use strict';
const { pathfind_sprite } = require('../engine/pathfind.js');

class Level {
  constructor() {
    this.segments = [];
  }

  add_component(component) {
    this[component.name] = component;
  }

  remove_component(name) {
    delete this[name];
  }

  create_grid(level_tiles) {
    this.grid = pathfind_sprite.create_level_grid(level_tiles);
  }
}

module.exports = {
  Level,
};
