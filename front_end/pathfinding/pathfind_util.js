const PIXI = require('pixi.js');
const { createjs } = require('@createjs/tweenjs');
const viewport = require('../engine/viewport');

//TODO needed to load the plugin
const rotation_plugin = require('../utils/RotationPlugin.js');
createjs.RotationPlugin.install();

const grid_container = new PIXI.Container();
grid_container.name = 'grid_container';

const sprite_grid = [];
const binary_grid_map = [];

function create_level_grid(tiles_object) {

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
    // Clear line
    if(i % tiles_object.columns === 0 && i){
      sprite_grid.push(line_grid);
      binary_grid_map.push(binary_line);

      line_grid = [];
      binary_line = [];

      current_y += grid_dimension;
      current_x = 0;
      current_grid_x = 0;
      current_grid_y += 1;
    }
    current_x += grid_dimension;
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
  global.easystar.setGrid(binary_grid_map);
  global.easystar.setAcceptableTiles([0]);
  global.easystar.setIterationsPerCalculation(1000);
}

function get_sprite_position_on_grid(sprite, container) {
  if(!container) throw 'gimme a container';

  const grid_containing_sprite = container.find(grid => (
    grid.containsPoint(sprite.getGlobalPosition())
  ));

  if(grid_containing_sprite){
    return grid_containing_sprite;
  } else {
    throw `${sprite.tag} not on grid`
  }
}

function highlight_grid_cell_from_path(path) {
  path.forEach(grid => {
    sprite_grid[grid.y][grid.x].alpha = 0.5;
  });
}

function create_path_from_two_grid_points(sprite_one, sprite_two) {
  return new Promise((resolve, reject) => {

    global.easystar.findPath(sprite_one.x, sprite_one.y, sprite_two.x, sprite_two.y, (path) => {

      if(path === null) {
        reject(new Error('no path found'));
      } else {
        resolve(path);
      }
    });
    // has to be here
    global.easystar.calculate();
  });
}

const distance_between_two_points = (point_one, point_two) => {
  return Math.hypot(point_two.x-point_one.x, point_two.y-point_one.y)
};

const generate_wait_time_with_threshold = (max, threshold) => {

  const random_number = Math.floor(Math.random() * max);

  // sometimes skip a wait at a point for the shits and giggles
  if(threshold && random_number < threshold) {
    return 0;
  }

  return random_number;
};

// TODO abstract this maths shiattttt
const generate_wait_time_with_minimum = (max, min) => {
  return Math.floor(Math.random() * max) + min;
};

function create_relative_walk_time(point_one, point_two, velocity = 15) {
  const distance = distance_between_two_points(point_one, point_two);

  //produce a little randomness in speed between points
  const speed = velocity + Math.random();

  const time_for_tween = distance * speed;

  const rounded_time = Math.round(time_for_tween);

  return rounded_time;
}

function move_sprite_on_path(sprite, path_array) {
  return new Promise((resolve, reject) => {
    
    const tween = createjs.Tween.get(sprite);

    const walk_time = create_relative_walk_time(path_array[0], path_array[1], 5);
    //TODO
    for (let i = 0; i < path_array.length; i++) {
      if(path_array[i-1] === undefined) continue;
      
      let angle_to_face = Math.atan2(path_array[i].middle.y -path_array[i-1].middle.y , path_array[i].middle.x - path_array[i-1].middle.x);

      tween.to({
        rotation: angle_to_face,
      }).to({
        x:path_array[i].middle.x,
        y:path_array[i].middle.y,
        rotation: angle_to_face,
      }, walk_time/2);
    }

    tween.call(()=>resolve());
  });
}

function move_enemy_to_point(sprite, point) {
  return new Promise((resolve, reject) => {

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

function path_enemy_on_points(enemy_sprite, point_array, options) {
  if( boolean_time === false ) return;

  boolean_time = false;

  if(global.is_development) {
    highlight_grid_cell_from_path(point_array);
  }

  const path_array = point_array.map(grid => (
    sprite_grid[grid.y][grid.x]
  ));

  // move from the current position to the start of the path
  move_enemy_to_point(enemy_sprite, path_array[0])
    .then(() => move_sprite_on_path(enemy_sprite, path_array))
    .then(() => wait_sprite(enemy_sprite, 500))
    .then(() => look_around_sprite(enemy_sprite, 1000, 1))
    .then(() => move_sprite_on_path(enemy_sprite, path_array.reverse()))
    .then(() => move_sprite_on_route(enemy_sprite))

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

function move_sprite_on_route(sprite) {
  return new Promise((resolve, reject) => {

    const tween = createjs.Tween.get(sprite);

    for (let i = 1; i < sprite.patrol_path.length; i++) {
  
      const walk_time = create_relative_walk_time(sprite.patrol_path[i-1], sprite.patrol_path[i], 10);
      const random_wait_time_with_threshold = generate_wait_time_with_threshold(2000, 300);
      const random_wait_time_with_minimum = generate_wait_time_with_minimum(3000, 1000);
  
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
  })
};

//testing
function run_pathfinding_test() {

  const enemy_sprite = viewport.children[7].children[0];
  const player_sprite = global.Player.sprite;

  const grid = grid_container.children;
  const enemy_point = get_sprite_position_on_grid(enemy_sprite, grid);
  const player_point = get_sprite_position_on_grid(player_sprite, grid);

  create_path_from_two_grid_points(enemy_point.cell_position, player_point.cell_position)
    .then(path_data => path_enemy_on_points(enemy_sprite, path_data));
}

// function path_from_enemy_to_player(enemy, player) {

//   const grid = grid_container.children;

//   const enemy_point = get_sprite_position_on_grid(enemy, grid);
//   const player_point = get_sprite_position_on_grid(player, grid);

//   create_path_from_two_grid_points(enemy_point.cell_position, player_point.cell_position)
//     .then(path_data => path_enemy_on_points(enemy_sprite, path_data));
// }


// setInterval(()=>{
//   // highlight_start_grid()

//   run_pathfinding_test();
// },2000);


module.exports = {
  create_level_grid,
  pathfind_from_enemy_to_player,
  move_sprite_on_path,
};

// function continue_sprite_on_default_path(sprite) {
//   const tween = sprite.path;

//   for (let i = 0; i < sprite.path.length; i++) {
//     // TODO
//     const walk_time = create_relative_walk_time(sprite.path[i-1] || sprite.path[0], sprite.path[i], 10);

//     const random_wait_time_with_threshold = generate_wait_time_with_threshold(2000, 300);

//     const random_wait_time_with_minimum = generate_wait_time_with_minimum(3000, 1000);

//     let angle_iterator = i + 1;

//     // TODO: you're a monster
//     if(sprite.path[i+1] === undefined) {
//       angle_iterator = 0;
//     }

//     //TODO stop  spinning 360, minus it from the factorial
//     const angle_to_face = Math.atan2(sprite.path[angle_iterator].y - sprite.path[i].y, sprite.path[angle_iterator].x - sprite.path[i].x) || 0;

//     tween.to({
//       x:sprite.path[i].x +50,
//       y:sprite.path[i].y +50,
//     }, walk_time, createjs.Ease.sineInOut)
//       .wait(random_wait_time_with_threshold)
//       .to({
//         rotation: angle_to_face,
//       }, random_wait_time_with_minimum, createjs.Ease.backInOut)
//       .wait(random_wait_time_with_threshold);
//   }
//   tween.call(()=>{
//     console.log('end of tween');
//   });

// }



// function highlight_start_grid () {

//   const grid = grid_container.children;
//   const enemy_sprite = global.viewport.children[7].children[0];
//   const player_sprite = global.Player.sprite;

//   const grid_to_highlight_enemy = get_sprite_position_on_grid(enemy_sprite, grid)

//   const grid_to_highlight_player = get_sprite_position_on_grid(player_sprite, grid)

//   // console.log(grid_to_highlight)

//   grid_to_highlight_enemy.alpha =1;
//   grid_to_highlight_player.alpha =1;

//   create_path_from_two_grid_points(grid_to_highlight_enemy.cell_position, grid_to_highlight_player.cell_position)
//   .then(path => {
//     console.log(path);
//     highlight_grid_cell_from_path(path)
//   })

// }


// // TODO one time the tween
// let boolean_time = true;

// function create_tween_on_point_array(sprite, point_array) {
//   if( boolean_time === false ) return;

//   sprite.path.paused = true;

//   boolean_time = false;

//   if(global.is_development) {
//     highlight_grid_cell_from_path(point_array);
//   }

//   const path_array = point_array.map(grid => (
//     sprite_grid[grid.y][grid.x]
//   ));

//   const tween_to_player = move_sprite_on_path_with_delay(sprite, path_array);

//   tween_to_player.call(() => {
//     move_sprite_on_path_with_delay(sprite, path_array.reverse());
//   })
// }
