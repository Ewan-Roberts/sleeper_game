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
    
    global.easystar.findPath(sprite_one.x, sprite_one.y, sprite_two.x, sprite_two.y, (path) => {
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


function run_pathfinding_test() {
  
  const enemy_sprite = global.enemy_container.children[0];
  const player_sprite = global.Player.sprite;

  const enemy_point = get_sprite_position_on_grid(enemy_sprite);
  const player_point = get_sprite_position_on_grid(player_sprite);

  const options = {
    time_to_wait : 500,
    time_to_point: 2000
  }

  create_path_from_two_points(enemy_point, player_point)
  .then(path_data => {

    create_tween_on_point_array_with_options(enemy_sprite, path_data, options);
  })

}



setInterval(()=>{
  run_pathfinding_test()
},2000)
