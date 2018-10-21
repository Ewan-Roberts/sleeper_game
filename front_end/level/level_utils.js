const PIXI = require('pixi.js');

module.exports.clearViewport = () => {
  for (let i = global.viewport.children.length - 1; i >= 0; i -= 1) {
    console.log(global.viewport.children[i].name)
    if (global.viewport.children[i].name === 'player') continue;

    global.viewport.removeChild(global.viewport.children[i]);
  }
};

module.exports.clearCollision = () => {
  for (let i = global.collisionItems.children.length - 1; i >= 0; i -= 1) {
    global.collisionItems.removeChild(global.collisionItems.children[i]);
  }
};

module.exports.clearEventTriggers = () => {
  for (let i = global.eventTriggers.children.length - 1; i >= 0; i -= 1) {
    global.eventTriggers.removeChild(global.eventTriggers.children[i]);
  }
};

// Solid Black wall
module.exports.renderWall = (wallArray) => {
  wallArray.forEach((wallData) => {
    const wall = PIXI.Sprite.fromFrame('black_dot');

    wall.position.set(wallData.x, wallData.y);
    wall.width = wallData.width;
    wall.height = wallData.height;
    global.collisionItems.addChild(wall);
  });
  global.viewport.addChild(global.collisionItems);
};

// hit area that is transparent, kept a little tint for testing
module.exports.hitAreas = (wallArray, x, y) => {
  wallArray.forEach((wallData) => {
    const wall = PIXI.Sprite.fromFrame('black_dot');

    wall.position.set(wallData.x + x, wallData.y + y);
    wall.width = wallData.width;
    wall.height = wallData.height;
    wall.alpha = 0.01;

    global.collisionItems.addChild(wall);
  });
};

// Load event pads
module.exports.eventPad = (padArray, callback) => {
  padArray.forEach((padDetails) => {
    const pad = PIXI.Sprite.fromFrame('black_dot');

    pad.position.set(padDetails.x, padDetails.y);
    pad.width = padDetails.width;
    pad.height = padDetails.height;
    pad.alpha = padDetails.alpha;
    pad.action = callback;
    pad.fired = false;
    pad.alpha = 0.5;
    global.eventTriggers.addChild(pad);
  });
  global.viewport.addChild(global.eventTriggers);
};

const debug_room_tiled_data = require('./debug/playground/map2_output.json');
const debug_room_tiled_tiles = require('./debug/playground/map2_tiles.json');

global.grid_container = new PIXI.Container();
global.grid_container.name = 'enemy_container';

const easystarjs = require('easystarjs');
const easystar = new easystarjs.js();

module.exports.load_debug_room_from_tiled = () => {

  return new Promise((resolve,reject) => {

    const debug_room_image = PIXI.Sprite.fromFrame('debug_room');
    debug_room_image.position.set(0,0);
    debug_room_image.width *= 2;
    debug_room_image.height *= 2;
    global.viewport.addChild(debug_room_image);
    let current_x = 0;
    let current_y = 0;
    const grid = [];
    let line_grid = [];
    let binary_line = [];
    let binary_grid_map = [];
    
    for (let i = 0; i < debug_room_tiled_tiles.tilecount; i++) {
      
      if(i % 20 === 0 && i !== 0){
        grid.push(line_grid);
        binary_grid_map.push(binary_line);
        line_grid = [];
        binary_line = [];
        current_y += 100;
        current_x = 0;
      }
      const grid_cell = PIXI.Sprite.fromFrame('black_dot');
      grid_cell.width = 100;
      grid_cell.height = 100;
      grid_cell.x = current_x;
      grid_cell.y = current_y;
      current_x += 100;
  
      if(debug_room_tiled_tiles.tileproperties.hasOwnProperty(i)){
        grid_cell.alpha = 0.5
        binary_line.push(1);
      } else {
        grid_cell.alpha = 0.1;
        binary_line.push(0);
      }
  
      line_grid.push(grid_cell);
  
      global.grid_container.addChild(grid_cell);
      global.viewport.addChild(global.grid_container);
    }
  
    const highlight_grid = (path, grid_line) => {
  
      for (let i = 0; i < path.length; i++) {
        const position = path[i];
  
        grid_line[position.y][position.x].alpha =0.3; 
      }
    }

    const grid_center = (path, grid_line) => {
      let grid_centers = [];
      for (let i = 0; i < path.length; i++) {
        const position = path[i];

        const block_found = grid_line[position.y][position.x];
  
        grid_centers.push({x: block_found.x, y: block_found.y})
      }
      return grid_centers;
    }
  
    easystar.setGrid(binary_grid_map);
  
    easystar.setAcceptableTiles([0]);
    easystar.setIterationsPerCalculation(1000);
    easystar.findPath(0, 0, 6, 6, (path) => {
      if(path === null) {
        console.log('no path foud');
      } else {
        console.log(path)

        highlight_grid(path, grid)
        const path_to_follow_based_on_grid_centers= grid_center(path, grid);
        resolve(path_to_follow_based_on_grid_centers);
      }
    });
    easystar.calculate()

  })
  
}