const PIXI = require('pixi.js');
const easystarjs = require('easystarjs');

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

module.exports.create_grid_position_from_sprite = (sprite) => {

  for (let i = 0; i < global.grid_container.children.length; i++) {
    const grid = global.grid_container.children[i];
    if(grid.containsPoint(sprite.getGlobalPosition())){
      return grid.cell_position;
    }
  }

}

module.exports.create_path_from_two_points = (point_1, point_2) => {
  const enemy_point = module.exports.create_grid_position_from_sprite(global.enemy_container.children[0])
  const player_point = module.exports.create_grid_position_from_sprite(global.Player.sprite)
  console.log(player_point)
  console.log(enemy_point)
  global.easystar.findPath(enemy_point.x, enemy_point.y, player_point.x, player_point.y, (path) => {
    if(path === null) {
      console.log('no path foud');
    } else {
      console.log('real path');
      console.log(path);
    }
  });
  global.easystar.calculate()

}


setInterval(()=>{
  // module.exports.find_player_point_on_grid(global.Player.sprite)
  module.exports.create_path_from_two_points();
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
