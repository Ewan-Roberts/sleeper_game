'use strict';
const PIXI = require('pixi.js');
const { grid_container      } = require('../engine/pixi_containers');
const { collision_container } = require('../engine/pixi_containers');

function check(rect1, rect2) {
  if (rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y) {
    return true;
  }
}

class Tile {
  constructor() {
    const thing = PIXI.Sprite.fromFrame('black_dot');
    thing.width  = 100;
    thing.height = 100;
    thing.passable = true;

    return thing;
  }
}

class Grid {
  constructor(data) {
    this.width  = data.width;
    this.height = data.height;
    this.area   = data.width * data.height;

    this.tile_width  = Math.ceil(data.width/100);
    this.tile_height = Math.ceil(data.height/100);

    this.tile_area= this.tile_height * this.tile_width;
    console.log(this);
  }

  build(data) {
    console.log(data);

    let y = 0;
    let x = 0;

    let alpha = 0.8;
    let current_grid_x = 0;
    let current_grid_y = 0;

    for(let i=0; i<=this.tile_area; i++){
      const tile = new Tile();
      tile.x = x;
      tile.y = y;
      tile.alpha = alpha -= 0.002;
      tile.anchor.set(0);

      tile.cell_position = {
        x: current_grid_x,
        y: current_grid_y,
      };

      x += 100;
      if(i % this.tile_width === 0) {
        if(i !== 0) {
          y += 100;
          current_grid_x = 0;
          current_grid_y++;
        }
        x = 0;
      }
      current_grid_x++;

      if(collision_container.children.length < 1) throw 'must have collision objects for grid';

      collision_container.children.forEach(object => {
        if(check(tile, object)) {
          tile.passable = false;
        }
      });

      grid_container.addChild(tile);
    }
  }

  build_matrix() {
    const binary_matrix = [];
    const sprite_matrix = [];

    let binary_line = [];
    let sprite_line = [];

    grid_container.children.forEach((tile, i) => {
      if(!tile.passable) {
        tile.alpha =0.8;
        binary_line.push(1);
      } else {
        binary_line.push(0);
      }
      sprite_line.push(tile);

      if(i % this.tile_width===0) {
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


