const PIXI = require('pixi.js');
const easystarjs = require('easystarjs');
const { createjs } = require('@createjs/tweenjs');

const easystar = new easystarjs.js();

global.grid_container = new PIXI.Container();
global.grid_container.name = 'enemy_container';

module.exports.lay_down_grid = () => {
  
  let current_x = -115;
  let current_y = -115;

  const slantedWall = PIXI.Sprite.fromFrame('black_dot');
  slantedWall.name = 'slanted wall';
  slantedWall.position.set(0, 0);
  slantedWall.alpha = 0
  global.viewport.addChild(slantedWall);

  const grid = [];
  let line_grid = [];
  let row = 0;
  let column = 0;

  for (let i = 0; i < 400; i++) {

    column++;
    if(i % 20 === 0 && i !== 0){
      grid.push(line_grid);
      line_grid = [];
      current_y += 50;
      current_x = -115;
      column = 0;
      row++;
    }
    console.log('hi')
    const grid_cell = PIXI.Sprite.fromFrame('black_dot');
    grid_cell.width = 50;
    grid_cell.height = 50;
    // grid_cell.grid_position = {
    //   x: row,
    //   y: column,
    // };
    grid_cell.x = current_x;
    grid_cell.y = current_y;
    current_x += 50;
    console.log(grid_cell)
    if(slantedWall.containsPoint(grid_cell.getGlobalPosition())){
      grid_cell.alpha = 0.3
    }
    line_grid.push(grid_cell);
    global.grid_container.addChild(grid_cell);
  }
  global.viewport.addChild(global.grid_container);
}
// TODO store this without having to loop through the whole grid
// module.exports.find_player_point_on_grid = player => {

//   global.grid_container.children.forEach(grid => {
//     if(grid.containsPoint(player.getGlobalPosition())){
//       // console.log('at grid: ' + grid)
//       grid.alpha = 1;
//     }
//   })
// }

// module.exports.find_enemy_point_on_grid = enemy => {
//   global.grid_container.children.forEach(grid => {

//     if(grid.containsPoint(enemy.getGlobalPosition())){
//       // console.log('enemy at')
//       return enemy.position;
//       // grid.alpha = 1;
//     }
//   })
// }

function create_grid_position_from_sprite(sprite) {

  for (let i = 0; i < global.grid_container.children.length; i++) {
    const grid = global.grid_container.children[i];
    if(grid.containsPoint(sprite.getGlobalPosition())){
      return grid.cell_position;
    }
  }
}

function highlight_grid_cell_from_path(path) {
  path.forEach(grid => {
    global.sprite_grid[grid.y][grid.x].alpha = 1;
  })
}

function create_path_from_two_points(sprite_one, sprite_two) {
  
  return new Promise((resolve) => {

    const enemy_point = create_grid_position_from_sprite(sprite_one);
    const player_point = create_grid_position_from_sprite(sprite_two);
    
    global.easystar.findPath(enemy_point.x, enemy_point.y, player_point.x, player_point.y, (path) => {
      if(path === null) {
        console.log('no path foud');
      } else {
        resolve(path)
      }
    });

    global.easystar.calculate()
  })
}

function create_tween_on_point_array_with_options(sprite, point_array, {time_to_wait, time_to_point}) { 

  let grid_positions = [];
  let path_to_follow = [];
  
  point_array.forEach(grid => {
    path_to_follow.push(global.sprite_grid[grid.y][grid.x]);
  })
  const time_length_total = 3000/point_array.length
  // sprite.position.set(path_to_follow[0].x, path_to_follow[0].y)

  // const tween = createjs.Tween.get(sprite)

  const tween = createjs.Tween.get(sprite)
  .to({
    x:path_to_follow[0].x,
    y:path_to_follow[0].y,
  },time_length_total)
  .to({
    x:path_to_follow[1].x,
    y:path_to_follow[1].y,
  },time_length_total)
  .to({
    x:path_to_follow[2].x,
    y:path_to_follow[2].y,
  },time_length_total)
  .to({
    x:path_to_follow[3].x,
    y:path_to_follow[3].y,
  },time_length_total)
  .to({
    x:path_to_follow[4].x,
    y:path_to_follow[4].y,
  },time_length_total)
  .to({
    x:path_to_follow[5].x,
    y:path_to_follow[5].y,
  },time_length_total)
  .to({
    x:path_to_follow[6].x,
    y:path_to_follow[6].y,
  },time_length_total)
  .to({
    x:path_to_follow[7].x,
    y:path_to_follow[7].y,
  },time_length_total)
  .to({
    x:path_to_follow[8].x,
    y:path_to_follow[8].y,
  },time_length_total)
  .to({
    x:path_to_follow[9].x,
    y:path_to_follow[9].y,
  },time_length_total)
  .to({
    x:path_to_follow[10].x,
    y:path_to_follow[10].y,
  },time_length_total)
  .call(()=>{
    console.log('poop')
  });
  // point_array.forEach(point => {

  //   tween.to({
  //     x: point.x,
  //     y: point.y,
  //   }, time_to_point)
  //   .wait(time_to_wait)

  // })

}


function create_path_tween_to_from_sprite_to_player(sprite, path_data) {

  // const player_point = create_grid_position_from_sprite(global.Player.sprite);
  // const sprite_path = create_grid_position_from_sprite(sprite);

  // create_path_from_two_points(sprite_path, player_point);
  console.log(path_data);
  console.log('path_data');
  const options = {
    time_to_wait : 500,
    time_to_point: 2000
  }

  const tween_to_add = create_tween_on_point_array_with_options(sprite, path_data, options);

  console.log(tween_to_add);
  return tween_to_add;
  // const tween = createjs.Tween.get(sprite);

  // tween.chain(tween_to_add);
}


setInterval(()=>{
  // module.exports.find_player_point_on_grid(global.Player.sprite)
  create_path_from_two_points(global.enemy_container.children[0], global.Player.sprite)
  .then(path_data => {
    highlight_grid_cell_from_path(path_data)
    create_path_tween_to_from_sprite_to_player(global.enemy_container.children[0], path_data);
  })
  // .then(new_tween => {
  //   // const current_tween = createjs.Tween.get(global.enemy_container.children[0])
  //   // current_tween.to(new_tween);
    

  //   // console.log('current_tween');
  //   // console.log(current_tween);
  //   // console.log('new_tween');
  //   // console.log(new_tween);
  // })
},3000)

// module.exports.get_sprite_point_on_grid = (enemy_sprite) => {
//   console.log('needle')
//   const needle = new PIXI.Point(1900,1600)

//   global.grid_container.children.forEach( grid_sprite => {
//     // console.log(grid_sprite)
//     console.log(grid_sprite)
    
//     if(grid_sprite.containsPoint(needle)) {
//       console.log('hit');
//       console.log(grid_sprite);
//       // grid_sprite.visable = false;
//       grid_sprite.alpha = 0;
      
      
//       global.easystar.findPath(0, 0, 1, 1, (path) => {
//         console.log(path);
//         console.log('path');
//         if(path === null) {
//           console.log('no path foud');
//         } else {
//           grid_sprite.alpha = 1;
//           console.log('grid_sprite')
//           console.log(grid_sprite)
//         }
//       });
//     }
    
//   })
// }
