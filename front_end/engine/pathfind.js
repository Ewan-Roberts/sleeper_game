'use strict';

const PIXI = require('pixi.js');
const { createjs } = require('@createjs/tweenjs');
const { viewport } = require('./viewport');
const {
  distance_between_points,
  generate_number_between_min_and_max,
  radian_positive,
} = require('../utils/math');

const grid_container = viewport.getChildByName('grid_container');

const sprite_grid = [];
const binary_grid_map = [];

const easystarjs = require('easystarjs');
const easystar = new easystarjs.js();

function create_level_grid(tiles_object) {
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
      grid_cell.alpha = 0.5;
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

  //TODO remove into an easystar function
  viewport.addChild(grid_container);
  easystar.setGrid(binary_grid_map);
  easystar.setAcceptableTiles([0]);
  easystar.setIterationsPerCalculation(1000);
}


function get_grid_sprite_on_point(point, container) {
  if(!container) throw 'gimme a container';

  const grid_containing_sprite = container.find(grid => (
    grid.containsPoint(point)
  ));

  if(grid_containing_sprite){
    return grid_containing_sprite;
  }
}



function highlight_grid_cell_from_path(path) {
  path.forEach(grid => {
    sprite_grid[grid.y][grid.x].alpha = 0.1;
  });
}

function create_path_from_two_grid_points(sprite_one, sprite_two) {
  return new Promise((resolve, reject) => {

    easystar.findPath(sprite_one.x, sprite_one.y, sprite_two.x, sprite_two.y, (path) => {

      if(path === null) {
        reject(new Error('no path found'));
      } else {
        resolve(path);
      }
    });

    easystar.enableDiagonals();
    easystar.enableCornerCutting();
    // has to be here
    easystar.calculate();
  });
}

const generate_wait_time_with_threshold = (max, threshold) => {

  const random_number = Math.floor(Math.random() * max);

  if(threshold && random_number < threshold) {
    return 0;
  }

  return random_number;
};

function create_relative_walk_time(point_one, point_two, velocity = 15) {
  const distance = distance_between_points(point_one, point_two);

  //produce a little randomness in speed between points
  const speed = velocity + Math.random();

  const time_for_tween = distance * speed;

  const rounded_time = Math.round(time_for_tween);

  return rounded_time;
}

function move_sprite_on_path(sprite, path_array) {
  const get_tween = PIXI.tweenManager.getTweensForTarget(sprite);
  if(get_tween.length > 0) {
    PIXI.tweenManager.removeTween(get_tween[0]);
  }
  const path = new PIXI.tween.TweenPath();
  const random_number = () => generate_number_between_min_and_max(-30, 30);
  if(path_array[2] === undefined) return;
  path.moveTo(sprite.x, sprite.y);
  path.arcTo(
    path_array[1].middle.x,
    path_array[1].middle.y,
    path_array[2].middle.x,
    path_array[2].middle.y,
    25
  );

  for (let i = 3; i < path_array.length; i++) {
    path.arcTo(
      path_array[i-1].middle.x + random_number(),
      path_array[i-1].middle.y + random_number(),
      path_array[i].middle.x + random_number(),
      path_array[i].middle.y + random_number(),
      30
    );
  }

  const tween = PIXI.tweenManager.createTween(sprite);
  tween.expire = true;
  tween.path = path;
  tween.time = path_array.length * 300;
  //tween.easing = PIXI.tween.Easing.inOutSine();
  tween.start();

  tween.on('update', () => {
    sprite.rotation = radian_positive(sprite, tween.path._tmpPoint);
  });

  const graphical_path = new PIXI.Graphics();
  graphical_path.lineStyle(2, 0xffffff, 0.1);
  graphical_path.drawPath(path);
  viewport.getChildByName('critter_container').addChild(graphical_path);
}

function move_sprite_to_point(sprite, point) {
  return new Promise(resolve => {

    const tween = createjs.Tween.get(sprite);
    const walk_time = create_relative_walk_time(sprite, point.middle);
    const angle_to_face = Math.atan2(point.middle.y - sprite.y, point.middle.x -sprite.x);

    tween.to({
      rotation: Math.abs(angle_to_face),
    })
      .to({
        x: point.middle.x,
        y: point.middle.y,
      }, walk_time, createjs.Ease.sineInOut);

    tween.call(()=>resolve());
  });
}

let boolean_time = true;

function path_enemy_on_points(enemy_sprite, point_array) {
  if( boolean_time === false ) return;

  boolean_time = false;

  if(global.is_development) {
    highlight_grid_cell_from_path(point_array);
  }

  const path_array = point_array.map(grid => (
    sprite_grid[grid.y][grid.x]
  ));

  // move from the current position to the start of the path
  move_sprite_to_point(enemy_sprite, path_array[0])
    .then(() => move_sprite_on_path(enemy_sprite, path_array))
    .then(() => wait_sprite(enemy_sprite, 500))
    .then(() => look_around_sprite(enemy_sprite, 1000, 1))
    .then(() => move_sprite_on_path(enemy_sprite, path_array.reverse()))
    .then(() => move_sprite_on_route(enemy_sprite));

}

function look_around_sprite(sprite, time, angle_to_rotate) {

  return new Promise(resolve => {
    const tween = createjs.Tween.get(sprite);
    tween.wait(500)
      .to({
        rotation: sprite.rotation + angle_to_rotate,
      },time/3)
      .to({
        rotation: sprite.rotation - angle_to_rotate,
      },time/2)
      .to({
        rotation: sprite.rotation + angle_to_rotate/2,
      },time/3);
    tween.wait(500);

    tween.call(()=>{
      resolve();
    });
  });
}

function wait_sprite(sprite, time) {
  return new Promise(resolve => {
    const tween = createjs.Tween.get(sprite);
    tween.wait(time);
    tween.call(()=>{
      resolve();
    });
  });
}

function pathfind_from_enemy_to_player(enemy_sprite, player_sprite) {
  const grid = grid_container.children;

  const enemy_point = get_sprite_position_on_grid(enemy_sprite, grid);
  const player_point = get_sprite_position_on_grid(player_sprite, grid);

  if(enemy_point && player_point){
    create_path_from_two_grid_points(enemy_point.cell_position, player_point.cell_position)
      .then(path_data => path_enemy_on_points(enemy_sprite, path_data));
  }
}

function move_sprite_on_route_straight(sprite) {
  return new Promise(resolve => {

    const tween = createjs.Tween.get(sprite);
    sprite.position.set(sprite.patrol_path[0].x,sprite.patrol_path[0].y);

    for (let i = 1; i < sprite.patrol_path.length; i++) {
      const walk_time = create_relative_walk_time(sprite.patrol_path[i-1], sprite.patrol_path[i], 5);
      const angle_to_face = Math.atan2(sprite.patrol_path[i].y - sprite.y, sprite.patrol_path[i].x - sprite.x);

      tween.to({
        x:sprite.patrol_path[i].x,
        y:sprite.patrol_path[i].y,
        rotation: angle_to_face,
      }, walk_time);
    }

    tween.call(()=>resolve());
  });
}

function move_sprite_on_route(sprite) {
  return new Promise(resolve => {

    const tween = createjs.Tween.get(sprite);

    for (let i = 1; i < sprite.patrol_path.length; i++) {

      const walk_time = create_relative_walk_time(sprite.patrol_path[i-1], sprite.patrol_path[i], 10);
      const random_wait_time_with_threshold = generate_wait_time_with_threshold(2000, 300);
      const random_wait_time_with_minimum = generate_number_between_min_and_max(3000, 1000);

      const angle_to_face = Math.atan2(sprite.patrol_path[i].y - sprite.y, sprite.patrol_path[i].x - sprite.x);

      tween.to({
        x:sprite.patrol_path[i].x,
        y:sprite.patrol_path[i].y,
      }, walk_time, createjs.Ease.sineInOut)
        .wait(random_wait_time_with_threshold)
        .to({
          rotation: angle_to_face,
        }, random_wait_time_with_minimum, createjs.Ease.backInOut)
        .wait(random_wait_time_with_threshold);
    }

    tween.call(()=>resolve());
  });
}

function get_sprite_position_on_grid(sprite, container) {
  if(!container) throw 'gimme a container';

  const sprite_position = sprite.getGlobalPosition();

  const grid_containing_sprite = container.find(grid => (
    grid.containsPoint(sprite_position)
  ));

  if(grid_containing_sprite){
    return grid_containing_sprite;
  }
}

async function move_sprite_to_sprite_on_grid(from_sprite, to_sprite) {

  const grid        = grid_container.children;
  const from_point  = get_sprite_position_on_grid(from_sprite,  grid);
  const to_point    = get_sprite_position_on_grid(to_sprite,    grid);

  if(!to_point) {
    throw `sprite: ${to_sprite.name} was not found`;
  }
  if(!from_point) {
    throw `sprite: ${from_sprite.name} was not found`;
  }

  //sprite_grid[to_point.cell_position.y][to_point.cell_position.x].alpha += 0.02;

  const path_data = await create_path_from_two_grid_points(from_point.cell_position, to_point.cell_position);

  highlight_grid_cell_from_path(path_data);

  const path_array = path_data.map(grid => (
    sprite_grid[grid.y][grid.x]
  ));

  move_sprite_on_path(from_sprite, path_array);

}


module.exports = {
  create_level_grid,
  pathfind_from_enemy_to_player,
  move_sprite_to_point,
  move_sprite_on_path,
  move_sprite_on_route,
  move_sprite_on_route_straight,
  highlight_grid_cell_from_path,
  get_sprite_position_on_grid,
  move_sprite_to_sprite_on_grid,
};


//testing
async function run_pathfinding_test() {
  const grid = grid_container.children;
  const rat_sprite = viewport.getChildByName('critter_container').getChildByName('rat');

  const rat_direction = viewport.getChildByName('enemy_container').getChildByName('enemy');

  const enemy_point = get_sprite_position_on_grid(rat_sprite, grid);
  const rat_point = get_sprite_position_on_grid(rat_direction, grid);

  //sprite_grid[rat_point.cell_position.y][rat_point.cell_position.x].alpha += 0.2;

  const path_data = await create_path_from_two_grid_points(enemy_point.cell_position, rat_point.cell_position);

  highlight_grid_cell_from_path(path_data);

  const path_array = path_data.map(grid => (
    sprite_grid[grid.y][grid.x]
  ));

  move_sprite_on_path(rat_sprite, path_array);

}


//setInterval(()=>{
//  // highlight_start_grid()

//  //run_pathfinding_test();
//},2000);


//function run_pathfinding_test() {
//  //console.log(viewport)
//  const enemy_sprite = viewport.children[5].children[0];
//  //console.log(enemy_sprite);
//  const player_sprite = viewport.children[12];
//  //console.log(player_sprite);
//
//  const grid = grid_container.children;
//  const enemy_point = get_sprite_position_on_grid(enemy_sprite, grid);
//  const player_point = get_sprite_position_on_grid(player_sprite, grid);
//  console.log('9999999999');
//  console.log(enemy_point);
//  console.log(player_point);
//  console.log('9999999999');
//
//  create_path_from_two_grid_points(enemy_point.cell_position, player_point.cell_position)
//    .then(path_data => {
//
//      highlight_grid_cell_from_path(path_data);
//
//      const path_array = path_data.map(grid => (
//        sprite_grid[grid.y][grid.x]
//      ));
//
//      // move from the current position to the start of the path
//      move_sprite_to_point(enemy_sprite, path_array[0])
//        .then(() => move_sprite_on_path(enemy_sprite, path_array))
//        .then(() => wait_sprite(enemy_sprite, 500));
//
//
//    });
//
//}
