'use strict';
const PIXI = require('pixi.js');

const { grid_container } = require('./pixi_containers');

class Grid {
  static create_level_grid(tiles_object) {
    const sprite_grid = [];
    const binary_grid_map = [];

    const grid_dimension = 100;

    let line_grid = [];
    let binary_line = [];

    let current_x = 0;
    let current_y = 0;

    let current_grid_x = 0;
    let current_grid_y = 0;

    for (let i = 1; i < tiles_object.tilecount; i++) {
      const grid_cell = PIXI.Sprite.fromFrame('black_dot');
      grid_cell.cell_position = {
        x: current_grid_x,
        y: current_grid_y,
      };

      current_x += grid_dimension;
      if(i % tiles_object.columns === 0){
        sprite_grid.push(line_grid);
        binary_grid_map.push(binary_line);

        line_grid = [];
        binary_line = [];

        current_y += grid_dimension;
        current_x = 0;
        current_grid_x = 0;
        current_grid_y += 1;
      }
      current_grid_x += 1;

      grid_cell.width   = grid_dimension;
      grid_cell.height  = grid_dimension;
      grid_cell.x       = current_x;
      grid_cell.y       = current_y;
      grid_cell.middle  = {
        x: grid_cell.x + grid_dimension/2,
        y: grid_cell.y + grid_dimension/2,
      };

      if(tiles_object.tileproperties.hasOwnProperty(i)){
        // is a wall
        grid_cell.alpha = 0.1;
        grid_cell.type = 'wall';
        binary_line.push(1);
      } else {
        // is walkable ground
        grid_cell.alpha = 0;
        binary_line.push(0);
      }

      line_grid.push(grid_cell);

      global.line_grid = line_grid;

      grid_container.addChild(grid_cell);
    }

    return {
      binary_grid_map,
      sprite_grid,
    };
  }
}

module.exports = {
  Grid,
};


