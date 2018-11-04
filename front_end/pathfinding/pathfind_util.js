const PIXI = require('pixi.js');
const easystarjs = require('easystarjs');
const { createjs } = require('@createjs/tweenjs');

const easystar = new easystarjs.js();

global.grid_container = new PIXI.Container();
global.grid_container.name = 'enemy_container';

function get_sprite_position_on_grid(sprite) {
  for (let i = 0; i < global.grid_container.children.length; i++) {
    const grid = global.grid_container.children[i];
    if(grid.containsPoint(sprite.getGlobalPosition())){
      return grid.cell_position;
    }
  }
}

function highlight_grid_cell_from_path(path) {
  path.forEach(grid => {
    global.sprite_grid[grid.y][grid.x].alpha = 0.5;
  })
}

function create_path_from_two_points(sprite_one, sprite_two) {
  return new Promise((resolve) => {

    const enemy_point = get_sprite_position_on_grid(sprite_one);
    const player_point = get_sprite_position_on_grid(sprite_two);
    
    global.easystar.findPath(enemy_point.x, enemy_point.y, player_point.x, player_point.y, (path) => {
      if(path === null) {
        console.log('no path found');
      } else {
        resolve(path)
      }
    });

    global.easystar.calculate()
  })
}

function create_tween_on_point_array_with_options(sprite, point_array, {time_to_wait, time_to_point}) { 
  
  highlight_grid_cell_from_path(point_array);

  let grid_positions = [];
  let path_to_follow = [];
  
  point_array.forEach(grid => {
    path_to_follow.push(global.sprite_grid[grid.y][grid.x]);
  })
  const time_length_total = 2000/point_array.length

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


function create_path_tween_to_from_sprite_to_player(sprite, path_data) {

  const options = {
    time_to_wait : 500,
    time_to_point: 2000
  }

  const tween_to_add = create_tween_on_point_array_with_options(sprite, path_data, options);

  console.log(tween_to_add);
  return tween_to_add;
}


setInterval(()=>{
  create_path_from_two_points(global.enemy_container.children[0], global.Player.sprite)
  .then(path_data => {
    create_path_tween_to_from_sprite_to_player(global.enemy_container.children[0], path_data);
  })
},2000)
