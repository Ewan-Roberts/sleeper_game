'use strict';
const PIXI = require('pixi.js');

const { grid_container } = require('../engine/pixi_containers');
const { collision_container } = require('../engine/pixi_containers');
const row_length = 20;

function check(rect1, rect2) {
  if (rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y) {
    return true;
  }
}
class Grid {
  static create(tiles_object) {
    const sprite_grid = [];
    const binary_grid_map = [];

    const grid_dimension = 100;

    let line_grid = [];
    let binary_line = [];

    let current_x = 0;
    let current_y = 0;

    let current_grid_x = 0;
    let current_grid_y = 0;

    for (let i = 0; i < tiles_object.tilecount; i++) {
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
        grid_cell.alpha = 1;
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

    collision_container.children.forEach(object => {
      grid_container.children.forEach(tile => {
        if(check(tile, object)) {
          tile.alpha = 1;
        }
      });
    });

    const binary_matrix = [];
    let binary_line1 = [];
    grid_container.children.forEach((tile, i) => {

      if(i % row_length ===0) {
        if(i !== 0) {
          binary_matrix.push(binary_line1);
        }

        binary_line1 = [];
      }
      if(tile.alpha === 1) {
        binary_line1.push(1);
      } else {
        binary_line1.push(0);
      }
    });




    console.log(binary_matrix);
    console.log(binary_grid_map);
    return {
      binary_grid_map: binary_matrix,
      sprite_grid,
    };
  }
}

module.exports = {
  Grid,
};


