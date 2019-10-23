// TODO
const { grids  } = require('./pixi_containers');
const { Grid   } = require('../utils/grid');
const easystarjs = require('easystarjs');
const easystar   = new easystarjs.js();
easystar.setIterationsPerCalculation(1000);
easystar.setAcceptableTiles([ 0, 2 ]);
easystar.setTileCost(2, 1); // only go through these tiles if you have to
easystar.enableDiagonals();
easystar.enableCornerCutting();

const find_grid = sprite => {
  const grid  = grids.children;
  const point = sprite.getGlobalPosition();

  const found_tile = grid.find(tile => tile.containsPoint(point));
  if(!found_tile) {
    throw `${sprite.name} was not found`;
  }

  return found_tile;
};

function path_between_grids (one, two) {
  return new Promise((resolve, reject) => {
    easystar.findPath(one.x, one.y, two.x, two.y, path => {
      if(path) {
        resolve(path);
      }

      reject(new Error('no path found'));
    });

    easystar.calculate();
  });
}

class pathfind {

  static no_highlights() {
    grids.children.forEach(grid => grid.alpha = 0);
  }

  static create_level_grid(tiled_level_data) {
    this.grid = new Grid(tiled_level_data);
    this.grid.build();
    this.grid.build_matrix();

    easystar.setGrid(this.grid.binary);
    return this.grid;
  }

  static highlight_grid_cell_from_path(path) {
    const { sprite } = this.grid;

    path.forEach(({ x, y }) => sprite[y][x].alpha = 0.4);
  }

  static async get_sprite_to_sprite_path(from_sprite, to_sprite) {
    const from_point = find_grid(from_sprite);
    const to_point   = find_grid(to_sprite);

    const path_data = await path_between_grids(from_point.cell_position, to_point.cell_position);

    this.highlight_grid_cell_from_path(path_data);
    return path_data.map(grid => this.grid.sprite[grid.y][grid.x]);
  }
}

module.exports = {
  pathfind,
};
