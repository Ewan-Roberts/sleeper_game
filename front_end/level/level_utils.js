const PIXI = require('pixi.js');
const { create_level_grid } = require('../pathfinding/pathfind_util.js');
const {
  init_enemies_container,
  create_enemy_at_location, 
  sight_line,
  influence_box,
  pathing,
} = require('../enemies/enemy.js');

// const Intersects = require('yy-intersects');

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

function render_background_segment(tiles_object) {

  const background_image = {
    x: 0,
    y: 0,
    height: tiles_object.imageheight,
    width:  tiles_object.imagewidth,
  }
  addToSegments(background_image)

}

function render_wall (wall_array, tiles_object, options) {
  
  render_background_segment(tiles_object)
  
  wall_array.objects.forEach((wall_data) => {
    const wall = PIXI.Sprite.fromFrame('black_dot');

    wall.position.set(wall_data.x + options.wall_offset.x, wall_data.y + options.wall_offset.y);
    wall.width = wall_data.width;
    wall.height = wall_data.height;

    addToSegments(wall)
    global.collisionItems.addChild(wall);

  });
  global.viewport.addChild(global.collisionItems);
};

// hit area that is transparent, kept a little tint for testing
module.exports.hit_areas = (wallArray, x, y) => {
  wallArray.forEach((wallData) => {
    const wall = PIXI.Sprite.fromFrame('black_dot');

    wall.position.set(wallData.x, wallData.y);
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
  debug_room_image.position.set(0,0);
  debug_room_image.width = debug_room_tiled_tiles.imagewidth;
  debug_room_image.height = debug_room_tiled_tiles.imageheight;

  global.viewport.addChild(debug_room_image);
  render_wall(debug_room_tiled_data.layers[1].objects, debug_room_tiled_tiles);
  create_level_grid(debug_room_tiled_tiles)

}

module.exports.load_bedroom_map = () => {
  
  const bedroom_room_tiled_data = require('./bedroom/level_data/bedroom_level_data.json');
  const bedroom_room_tiled_tiles = require('./bedroom/level_data/flat_floor_data.json');

  const bedroom_room_image = PIXI.Sprite.fromFrame('flat_floor2');
  bedroom_room_image.alpha = 0.8;
  bedroom_room_image.position.set(100,0);
  bedroom_room_image.width = bedroom_room_tiled_tiles.imagewidth;
  bedroom_room_image.height = bedroom_room_tiled_tiles.imageheight;

  const options = {
    wall_offset: {
      x: 280,
      y: 280,
    }
  }

  global.viewport.addChild(bedroom_room_image);
  render_wall(bedroom_room_tiled_data.layers[1], bedroom_room_tiled_tiles, options);
  create_level_grid(bedroom_room_tiled_tiles)
  
  init_enemies_container();

  create_enemy_at_location(100, 100)
  .then(sprite => {
    sight_line(sprite);
    influence_box(sprite);
    console.log('HELLO')
    pathing(sprite, bedroom_room_tiled_data.layers[2]);
  })

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