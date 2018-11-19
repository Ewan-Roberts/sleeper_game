const PIXI = require('pixi.js');
const { create_level_grid } = require('../pathfinding/pathfind_util.js');
const {
  init_enemies_container,
  Enemy,
} = require('../enemies/enemy.js');


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
    this.segments = [];
  }

  add_to_segments(item) {

    this.segments.push(
        {a:{x:item.x,y:item.y+item.height},             b:{x:item.x,y:item.y}},
        {a:{x:item.x,y:item.y},                         b:{x:item.x+item.width,y:item.y}},
        {a:{x:item.x+item.width,y:item.y+item.height},  b:{x:item.x,y:item.y+item.height}},
        {a:{x:item.x+item.width,y:item.y+item.height},  b:{x:item.x+item.width,y:item.y}},
    )
  }

  set_background_image(image, x, y) {
    
    this.background_image = image;
    this.background_image.position.set(x, y);
    
    // why is this is tiles data? rename?
    this.background_image.width = this.level_tiles.imagewidth;
    this.background_image.height = this.level_tiles.imageheight;  
    
    this.add_to_segments(this.background_image);
    global.viewport.addChild(this.background_image);
  }

  render_walls(options) {
    const wall_array = this.level_data.layers[1];
  
    wall_array.objects.forEach((wall_data) => {
      const wall = PIXI.Sprite.fromFrame('black_dot');
  
      wall.position.set(wall_data.x + options.wall_offset.x, wall_data.y + options.wall_offset.y);
      wall.width = wall_data.width;
      wall.height = wall_data.height;
  
      this.add_to_segments(wall)
  
      global.collisionItems.addChild(wall);
    });

    global.viewport.addChild(global.collisionItems);
  }

  create_grid() {
    this.grid = create_level_grid(this.level_tiles);
  }

  create_enemy(x, y) {
    //TODO
    init_enemies_container();

    const enemy = new Enemy();
    enemy.set_position(x, y);
    enemy.create_direction_line();
    enemy.add_vitals();
    enemy.add_sight_line();
    enemy.add_influence_box();
    enemy.create_light();
    enemy.add_raycasting(this.segments);
    enemy.add_to_container();
    
    const formatted_path_data = format_path_data(this.level_data.layers[2]);
    enemy.create_patrol_path(formatted_path_data);
  }

}

module.exports.load_debug_map_image = () => {
  
  const debug_room_tiled_data = require('./debug/playground/map2_output.json');
  const debug_room_tiled_tiles = require('./debug/playground/map2_tiles.json');
  const debug_room_image = PIXI.Sprite.fromFrame('debug_room');

  const debug_room = new Level(debug_room_tiled_data, debug_room_tiled_tiles);

  const options = {
    wall_offset: {
      x: 0,
      y: 0,
    }
  }

  debug_room.set_background_image(debug_room_image, 0, 0);
  debug_room.render_walls(options);
  debug_room.create_grid();
  // debug_room.create_enemies();
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

  const bedroom = new Level(bedroom_room_tiled_data, bedroom_room_tiled_tiles);

  const options = {
    wall_offset: {
      x: 280,
      y: 280,
    }
  }

  bedroom.set_background_image(bedroom_room_image, 100, 0);
  bedroom.render_walls(options);
  bedroom.create_grid();
  bedroom.create_enemy(1800, 1000);
}
