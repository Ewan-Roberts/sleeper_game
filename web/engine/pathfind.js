'use strict';

const PIXI     = require('pixi.js');
const { Grid } = require('./grid');
const {
  gui_container,
  grid_container,
} = require('./pixi_containers');

const { easystar } = require('../vendor/easystar');

const {
  random_number,
  radian,
} = require('../utils/math');

class pathfind_sprite {
  constructor() {
    this.boolean_time = true;
    this.sprite_grid = [];
  }

  static create_level_grid(tiles_object) {
    const { binary_grid_map, 'sprite_grid': grid }
      = Grid.create_level_grid(tiles_object);
    this.sprite_grid = grid;
    easystar.setGrid(binary_grid_map);
  }

  static highlight_grid_cell_from_path(path) {
    path.forEach(grid => this.sprite_grid[grid.y][grid.x].alpha = 0.1);
  }

  static create_path_from_two_grid_points(sprite_one, sprite_two) {
    return new Promise((resolve, reject) => {
      easystar.findPath(sprite_one.x, sprite_one.y, sprite_two.x, sprite_two.y,
        (path) => {
          if(path === null) {
            reject(new Error('no path found'));
          } else {
            resolve(path);
          }
        });

      easystar.calculate();
    });
  }

  static create_path(sprite, path_array) {
    const path = new PIXI.tween.TweenPath();
    const random_number = () => random_number(-30, 30);

    path.moveTo(sprite.x, sprite.y);

    for (let i = 2; i < path_array.length; i++) {
      path.arcTo(
        path_array[i-1].middle.x + random_number(),
        path_array[i-1].middle.y + random_number(),
        path_array[i].middle.x   + random_number(),
        path_array[i].middle.y   + random_number(),
        25
      );
    }

    return path;
  }

  static move_sprite_on_path(sprite, path_array) {
    if(path_array.length < 2) return;

    const get_tween = PIXI.tweenManager.getTweensForTarget(sprite);
    get_tween.forEach(tween => PIXI.tweenManager.removeTween(tween));

    const path = this.create_path(sprite, path_array);

    const tween  = PIXI.tweenManager.createTween(sprite);
    tween.expire = true;
    tween.path   = path;
    tween.time   = path_array.length * 300;
    //tween.easing = PIXI.tween.Easing.inOutSine();
    tween.start();

    tween.on('update', () =>
      sprite.rotation = radian(sprite, tween.path._tmpPoint) + sprite.rotation_offset);

    const graphical_path = new PIXI.Graphics();
    graphical_path.lineStyle(5, 0xffffff, 0.1);
    graphical_path.drawPath(path);

    gui_container.addChild(graphical_path);
  }

  path_enemy_on_points(enemy_sprite, point_array) {
    if( this.boolean_time === false ) return;
    this.boolean_time = false;

    if(global.is_development) {
      this.highlight_grid_cell_from_path(point_array);
    }

    const path_array = point_array.map(grid => (
      this.sprite_grid[grid.y][grid.x]
    ));

    // move from the current position to the start of the path
    this.move_sprite_to_point(enemy_sprite, path_array[0])
      .then(() => this.move_sprite_on_path(enemy_sprite, path_array))
      .then(() => this.wait_sprite(enemy_sprite, 500))
      .then(() => this.look_around_sprite(enemy_sprite, 1000, 1))
      .then(() => this.move_sprite_on_path(enemy_sprite, path_array.reverse()))
      .then(() => this.move_sprite_on_route(enemy_sprite));

  }


  pathfind_from_enemy_to_player(enemy_sprite, player_sprite) {
    const grid = grid_container.children;

    const enemy_point = this.get_sprite_position_on_grid(enemy_sprite, grid);
    const player_point = this.get_sprite_position_on_grid(player_sprite, grid);

    if(enemy_point && player_point){
      this.create_path_from_two_grid_points(enemy_point.cell_position, player_point.cell_position)
        .then(path_data => this.path_enemy_on_points(enemy_sprite, path_data));
    }
  }

  static async move_sprite_to_sprite_on_grid(from_sprite, to_sprite) {
    const grids = grid_container.children;

    const from_point = grids.find(grid =>
      grid.containsPoint(from_sprite.getGlobalPosition()));

    const to_point = grids.find(grid =>
      grid.containsPoint(to_sprite.getGlobalPosition()));

    if(!to_point  ) throw `sprite: ${to_sprite.name} was not found`;
    if(!from_point) throw `sprite: ${from_sprite.name} was not found`;
    //sprite_grid[to_point.cell_position.y][to_point.cell_position.x].alpha += 0.02;

    const path_data = await this.create_path_from_two_grid_points(from_point.cell_position, to_point.cell_position);

    const path_array = path_data.map(grid => this.sprite_grid[grid.y][grid.x]);

    this.highlight_grid_cell_from_path(path_data);
    this.move_sprite_on_path(from_sprite, path_array);
  }
}

module.exports = {
  pathfind_sprite,
};


//testing
//async function run_pathfinding_test() {
//  const grid = grid_container.children;
//  const rat_sprite = viewport.getChildByName('critter_container').getChildByName('rat');
//
//  const rat_direction = viewport.getChildByName('enemy_container').getChildByName('enemy');
//
//  const enemy_point = get_sprite_position_on_grid(rat_sprite, grid);
//  const rat_point = get_sprite_position_on_grid(rat_direction, grid);
//
//  //sprite_grid[rat_point.cell_position.y][rat_point.cell_position.x].alpha += 0.2;
//
//  const path_data = await create_path_from_two_grid_points(enemy_point.cell_position, rat_point.cell_position);
//
//  highlight_grid_cell_from_path(path_data);
//
//  const path_array = path_data.map(grid => (
//    sprite_grid[grid.y][grid.x]
//  ));
//
//  move_sprite_on_path(rat_sprite, path_array);
//}

