const PIXI = require('pixi.js');
const { create_level_grid } = require('../pathfinding/pathfind_util.js');

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

global.segments = [];

const addToSegments = item => {

  global.segments.push(
      {a:{x:item.x,y:item.y+item.height},             b:{x:item.x,y:item.y}},
      {a:{x:item.x,y:item.y},                         b:{x:item.x+item.width,y:item.y}},
      {a:{x:item.x+item.width,y:item.y+item.height},  b:{x:item.x,y:item.y+item.height}},
      {a:{x:item.x+item.width,y:item.y+item.height},  b:{x:item.x+item.width,y:item.y}},
  )
}

// Solid Black wall
function render_wall (wallArray, tiles_object) {
  wallArray.forEach((wallData) => {
    const wall = PIXI.Sprite.fromFrame('black_dot');

    wall.position.set(wallData.x +100, wallData.y);
    wall.width = wallData.width;
    wall.height = wallData.height;
    
    const background_image = {
      x: 0,
      y: 0,
      height: tiles_object.imageheight + 500,
      width:  tiles_object.imagewidth + 500,
    }
    addToSegments(background_image)
    addToSegments(wall)
    global.collisionItems.addChild(wall);

    
  });
  global.viewport.addChild(global.collisionItems);
};

// hit area that is transparent, kept a little tint for testing
module.exports.hit_areas = (wallArray, x, y) => {
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
module.exports.event_pad = (padArray, callback) => {
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

const easystarjs = require('easystarjs');
global.easystar = new easystarjs.js();

module.exports.load_debug_map_image = () => {
  
  const debug_room_tiled_data = require('./debug/playground/map2_output.json');
  const debug_room_tiled_tiles = require('./debug/playground/map2_tiles.json');

  const debug_room_image = PIXI.Sprite.fromFrame('debug_room');
  debug_room_image.position.set(100,0);
  debug_room_image.width = debug_room_tiled_tiles.imagewidth;
  debug_room_image.height = debug_room_tiled_tiles.imageheight;

  global.viewport.addChild(debug_room_image);
  render_wall(debug_room_tiled_data.layers[1].objects, debug_room_tiled_tiles);
  create_level_grid(debug_room_tiled_tiles)

}




// const grid_center = (path, grid_line) => {
//   let grid_centers = [];
//   for (let i = 0; i < path.length; i++) {
//     const position = path[i];

//     const block_found = grid_line[position.y][position.x];
    
//     //TODO for testing
//     block_found.alpha = 0.3;

//     grid_centers.push({
//       x: block_found.x + (debug_room_tiled_tiles.tilewidth/2), 
//       y: block_found.y + (debug_room_tiled_tiles.tileheight/2)
//     })
//   }
//   return grid_centers;
// }