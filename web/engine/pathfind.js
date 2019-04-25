'use strict';
const PIXI = require('pixi.js');
const { grid_container } = require('./pixi_containers');

const { Grid   } = require('../utils/grid');
const { Tween  } = require('./tween');
//const { radian } = require('../utils/math');
const easystarjs = require('easystarjs');
const easystar   = new easystarjs.js();
easystar.setIterationsPerCalculation(2000);
easystar.setAcceptableTiles([0,2]);
easystar.setTileCost(2, 12); //only if you have to!
easystar.enableDiagonals();
easystar.enableCornerCutting();

const find_grid = sprite => {
  const grid  = grid_container.children;
  const point = sprite.getGlobalPosition();

  const found_tile = grid.find(tile => tile.containsPoint(point));

  if(!found_tile) throw `${sprite.name} was not found`;

  return found_tile;
};

function path_between_grids (one, two) {
  return new Promise((resolve, reject) => {
    easystar.findPath(one.x, one.y, two.x, two.y, path => {
      if(path) resolve(path);

      reject(new Error('no path found'));
    });

    easystar.calculate();
  });
}


class pathfind_sprite {
  static create_level_grid(tiled_level_data) {
    this.grid = new Grid(tiled_level_data);
    this.grid.build();
    this.grid.build_matrix();

    easystar.setGrid(this.grid.binary);
  }

  static highlight_grid_cell_from_path(path) {
    const { sprite } = this.grid;

    path.forEach(({x,y}) => sprite[y][x].alpha = 0.2);
  }

  static move_sprite_on_path(sprite, path_array) {
    if(path_array.length < 2) return;
    const tweens = PIXI.tweenManager.getTweensForTarget(sprite);
    if(tweens.length > 1) return;

    const tween = new Tween(sprite);
    tween.time  = path_array.length * 500;
    tween.from_path(sprite);
    const foo = path_array.map(path => {
      return {
        x: path.x + 50,
        y: path.y + 50,
      };
    });

    tween.add_random_path(foo);
    tween.draw_path();
    tween.start();

    //tween.movement.on('update', () => sprite.rotation = radian(sprite, tween.path._tmpPoint));
  }

  static async grid_around_sprite(target) {
    const { cell_position } = find_grid(target);
    const { x, y } = cell_position;
    const { sprite } = this.grid;

    const array_thing = [
      [
        sprite[y-1][x-1],
        sprite[y-1][x  ],
        sprite[y-1][x+1],
      ],
      [
        sprite[y][x-1],
        sprite[y][x  ],
        sprite[y][x+1],
      ],
      [
        sprite[y+1][x-1],
        sprite[y+1][x  ],
        sprite[y+1][x+1],
      ],
    ];

    console.log(array_thing);
  }

  static async move_sprite_to_sprite_on_grid(from_sprite, to_sprite) {
    const path_array = await this.get_sprite_to_sprite_path(from_sprite, to_sprite);

    const wall_path = this.shit(path_array);
    this.move_sprite_on_path(from_sprite, wall_path);
  }

  static shit(poo) {
    const arr = [];

    for (let i = 0; i < poo.length; i++) {
      if(poo[i].door) {
        console.log(poo[i]);
        delete poo[i].door;
        poo[i].shit.visible = false;
        poo[i].visible = false;
        return arr;
      }

      arr.push(poo[i]);
    }
    return arr;
  }

  static async get_sprite_to_sprite_path(from_sprite, to_sprite) {
    const from_point = find_grid(from_sprite);
    const to_point   = find_grid(to_sprite);

    const path_data = await path_between_grids(from_point.cell_position, to_point.cell_position);
    const tile_path = path_data.map(grid => this.grid.sprite[grid.y][grid.x]);

    this.highlight_grid_cell_from_path(path_data);
    return tile_path;
  }
}

module.exports = {
  pathfind_sprite,
};
