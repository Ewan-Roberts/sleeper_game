const PIXI = require('pixi.js');
// const easystarjs = require('easystarjs');
const { createjs } = require('@createjs/tweenjs');
const rotation_plugin = require('../utils/RotationPlugin.js');

// rotation_plugin.install();

// const easystar = new easystarjs.js();

// RotationPlugin.install(props);
//
console.log(createjs);
createjs.RotationPlugin.install()
// createjs.Tween._installPlugin(rotation_plugin);

const grid_container = new PIXI.Container();
grid_container.name = 'enemy_container';

const sprite_grid = [];
const binary_grid_map = [];

module.exports.create_level_grid = (tiles_object) => {
  console.log(rotation_plugin)
  let line_grid = [];
  let binary_line = [];

  let current_x = 0;
  let current_y = 0;

  let current_grid_x = 0;
  let current_grid_y = 0;
  
  for (let i = 0; i < tiles_object.tilecount; i++) {
    
    if(i % tiles_object.columns === 0 && i){
      sprite_grid.push(line_grid);
      binary_grid_map.push(binary_line);

      line_grid = [];
      binary_line = [];

      current_y += 100;
      current_x = 0;
      current_grid_x = 0;
      current_grid_y += 1;
    }
    current_x += 100;
    current_grid_x += 1;
    
    const grid_cell = PIXI.Sprite.fromFrame('black_dot');
    grid_cell.width = 100;
    grid_cell.height = 100;
    grid_cell.x = current_x;
    grid_cell.y = current_y;
    grid_cell.middle = {
      x: grid_cell.x + 50,
      y: grid_cell.y + 50,
    }
    grid_cell.cell_position = {
      x: current_grid_x,
      y: current_grid_y,
    }

    if(tiles_object.tileproperties.hasOwnProperty(i)){
      // is a wall
      grid_cell.alpha = 0.5
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
  
  global.viewport.addChild(grid_container);
  global.easystar.setGrid(binary_grid_map);
  global.easystar.setAcceptableTiles([0]);
  global.easystar.setIterationsPerCalculation(1000);
}

function get_sprite_position_on_grid(sprite, container) {
  if(!container) throw 'dude, gimme a container ya dumb dumb: get_point_position_on_grid'

  for (let i = 0; i < container.length; i++) {
    const grid = container[i];

    if(grid.containsPoint(sprite.getGlobalPosition())){
      return grid.cell_position;
    }
  }
  throw `${sprite.tag} not on grid`
}

function highlight_grid_cell_from_path(path) {
  path.forEach(grid => {
    sprite_grid[grid.y][grid.x].alpha = 0.5;
  })
}

function create_path_from_two_grid_points(sprite_one, sprite_two) {
  return new Promise((resolve) => {
    
    global.easystar.findPath(sprite_one.x, sprite_one.y, sprite_two.x, sprite_two.y, (path) => {
      if(path === null) {
        throw 'no path found';
      } else {
        resolve(path)
      }
    });

    global.easystar.calculate()
  })
}

const distance_between_two_points = (point_one, point_two) => Math.hypot(point_two.x-point_one.x, point_two.y-point_one.y)

const generate_wait_time_with_threshold = (max, threshold) => {

  const random_number = Math.floor(Math.random() * max);

  // sometimes skip a wait at a point for the shits and giggles
  if(threshold && random_number < threshold) {
    return 0;
  }

  return random_number;
}

function create_relative_walk_time(point_one, point_two) {

  const distance = distance_between_two_points(point_one, point_two);
  
  //produce a little randomness in speed between points 
  const speed = 15 + Math.random();

  const time_or_tween = distance * speed;

  const rounded_time = Math.round(time_or_tween)
  
  return rounded_time;
}

module.exports.move_sprite_on_path = (sprite, path_array) => {

  const tween = createjs.Tween.get(sprite);

  for (let i = 0; i < path_array.length; i++) {

    const walk_time = create_relative_walk_time(path_array[i-1] || path_array[0], path_array[i])

    const random_wait_time = generate_wait_time_with_threshold(2000, 300)
    
    const angle_to_face = Math.atan2(path_array[i+1].y - path_array[i].y, path_array[i+1].x - path_array[i].x);

    tween.to({
      x:path_array[i].x,
      y:path_array[i].y,
    }, walk_time, createjs.Ease.sineInOut)
    .wait(random_wait_time/2)
    .to({
      rotation: angle_to_face
    }, random_wait_time*2, createjs.Ease.backInOut)
    .wait(random_wait_time/2)
  }

  tween.call(()=>{
    console.log('end of tween')
  });
}

function create_tween_on_point_array_with_options(sprite, point_array, {time_to_wait, time_to_point}) { 
  
  highlight_grid_cell_from_path(point_array);
  let path_to_follow = [];
  
  point_array.forEach(grid => {
    path_to_follow.push(sprite_grid[grid.y][grid.x]);
  })

  const time_length_total = 2000 / point_array.length

  const tween = createjs.Tween.get(sprite)

  for (let i = 1; i < path_to_follow.length; i++) {
    tween.to({
      x:path_to_follow[i].middle.x,
      y:path_to_follow[i].middle.y,
    },time_length_total)
  }

  tween.call(()=>{
    console.log('end of tween')
  });
}


function run_pathfinding_test() {
  
  const enemy_sprite = global.enemy_container.children[0];
  const player_sprite = global.Player.sprite;

  const enemy_point = get_sprite_position_on_grid(enemy_sprite, grid_container.children);
  const player_point = get_sprite_position_on_grid(player_sprite, grid_container.children);

  const options = {
    time_to_wait : 500,
    time_to_point: 2000
  }

  create_path_from_two_grid_points(enemy_point, player_point)
  .then(path_data => {
    create_tween_on_point_array_with_options(enemy_sprite, path_data, options);
  })
}

// setInterval(()=>{
//   run_pathfinding_test()
// },2000)
