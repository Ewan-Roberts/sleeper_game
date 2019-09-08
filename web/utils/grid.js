const { Sprite     } = require('pixi.js');
const { Texture    } = require('pixi.js');
const { grids      } = require('../engine/pixi_containers');
const { collisions } = require('../engine/pixi_containers');
const { env } = require('../../config');

// this is for y axis 1
function check(rect1, rect2) {
  if(rect1.x < rect2.x + rect2.width
    && rect1.x + rect1.width > rect2.x
    && rect1.y < rect2.y
    && rect1.y + rect1.height > rect2.y - rect2.height) {
    return true;
  }
  return false;
}

class Tile extends Sprite {
  constructor() {
    super(Texture.WHITE);
    this.width    = 100;
    this.height   = 100;
    this.passable = true;
    this.alpha    = 0.2;
    this.anchor.set(0);
  }
}

class Grid {
  constructor(data) {
    this.width  = data.width;
    this.height = data.height;
    this.area   = data.width * data.height;
    this.original_x = Math.round(data.x);
    this.x = Math.round(data.x);
    this.y = Math.round(data.y);

    this.tile_width  = Math.ceil(data.width / 100);
    this.tile_height = Math.ceil(data.height / 100);
    this.tile_area   = this.tile_height * this.tile_width;
  }

  build() {
    let grid_x = 0;
    let grid_y = 0;

    for (let i = 0; i <= this.tile_area; i++){
      const tile = new Tile();
      tile.position.copy(this);

      // This is for the pathfinder
      tile.cell_position = {
        'x': grid_x,
        'y': grid_y,
      };

      this.x += 100;
      if(i % this.tile_width === 0) {
        if(i !== 0) {
          this.y += 100;
          grid_x = 0;
          grid_y++;
        }

        this.x = this.original_x;
      }
      grid_x++;

      collisions.children.forEach(object => {
        if(check(tile, object)) {
          tile.passable = false;
          if(object.door) {
            tile.door = true;
            tile.id   = object.id;
          }
        }
      });

      grids.addChild(tile);
    }
  }

  build_matrix() {
    const binary_matrix = [];
    const sprite_matrix = [];

    let binary_line = [];
    let sprite_line = [];

    grids.children.forEach((tile, i) => {
      if(!tile.passable) {
        if(env.show_grid) {
          tile.alpha = 0.3;
        }
        if(tile.door) {
          binary_line.push(2);
          if(env.show_grid) {
            tile.alpha = 1;
          }

        } else {
          binary_line.push(1);
        }
      } else {
        binary_line.push(0);
      }

      sprite_line.push(tile);

      if(i % this.tile_width === 0) {
        if(i !== 0) {
          binary_matrix.push(binary_line);
          sprite_matrix.push(sprite_line);
        }

        sprite_line = [];
        binary_line = [];
      }
    });

    this.binary = binary_matrix;
    this.sprite = sprite_matrix;
  }
}

module.exports = {
  Grid,
};
