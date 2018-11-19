const PIXI = require('pixi.js');
const { create_level_grid, move_sprite_on_path } = require('../pathfinding/pathfind_util.js');
const {
  init_enemies_container,
  create_enemy_patrol_path,
  Enemy,
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

class Level {
  constructor(level_data, level_tiles) {
    this.level_data = level_data;
    this.level_tiles = level_tiles;
  }

  set_background_image(image) {
    
    this.background_image = image;
    this.background_image.position.set(0,0);
    
    // why is this is tiles data? rename?
    this.background_image.width = this.level_tiles.imagewidth;
    this.background_image.height = this.level_tiles.imageheight;  
    
    addToSegments(background_image);
  }

  render_walls() {
    const wall_array = this.level_data.layers[1];
  
    wall_array.objects.forEach((wall_data) => {
      const wall = PIXI.Sprite.fromFrame('black_dot');
  
      wall.position.set(wall_data.x + options.wall_offset.x, wall_data.y + options.wall_offset.y);
      wall.width = wall_data.width;
      wall.height = wall_data.height;
  
      addToSegments(wall)
  
      global.collisionItems.addChild(wall);
  
    });
    global.viewport.addChild(global.collisionItems);

  }

  create_grid() {
    this.grid = create_level_grid(this.level_tiles);
  }

  create_enemies() {
    
    init_enemies_container();

    const enemy = new Enemy();
    // bundle up
    enemy.set_position(1800, 1000)
    enemy.create_direction_line()
    enemy.add_vitals()
    enemy.add_sight_line()
    enemy.add_influence_box()
    enemy.create_light()
    enemy.add_raycasting()
    enemy.add_to_container()
    
    const formatted_path_data = format_path_data(this.level_data.layers[2])
    enemy.sprite.patrol_path = formatted_path_data;
  }

}

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

function format_path_data(path_data){

  const formatted_path_array = [];

  //this is bad, feel bad
  for (let i = 0; i < path_data.objects[0].polyline.length; i++) {
    const element = path_data.objects[0].polyline[i];
    const path_data2 = {
      x: element.x + path_data.objects[0].x,
      y: element.y + path_data.objects[0].y,
    } 
    formatted_path_array.push(path_data2);
  }

  return formatted_path_array;
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

  const enemy = new Enemy();
  // bundle up
  enemy.set_position(1800, 1000)
  enemy.create_direction_line()
  enemy.add_vitals()
  enemy.add_sight_line()
  enemy.add_influence_box()
  enemy.create_light()
  enemy.add_raycasting()
  enemy.add_to_container()


  const formatted_path_data = format_path_data(bedroom_room_tiled_data.layers[2])
  enemy.sprite.patrol_path = formatted_path_data;
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