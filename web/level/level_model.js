'use strict';
const { pathfind_sprite } = require('../engine/pathfind.js');

class Level {
  create_grid(level_tiles) {
    this.grid = pathfind_sprite.create_level_grid(level_tiles);
  }
}

module.exports = {
  Level,
};
