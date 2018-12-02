const PIXI = require('pixi.js');
const viewport = require('../engine/viewport');

const { 
  create_level_grid, move_sprite_on_route,
  move_sprite_on_route_straight 
} = require('../engine/pathfind.js');
const { Enemy } = require('../character/enemy.js');
const { Friend } = require('../character/friend.js');
const { Rat } = require('../character/rat');
const { createjs } = require('@createjs/tweenjs');
const { Player } = require('../character/player.js');
const { Door } = require('../object_management/hard_furnishing/door.js');
const { Chest } = require('../object_management/items/chest');
const { Effects } = require('../cutscene/cutscene_utils');
const { Merc } = require('../dialog/dialog_util');
const { GUI_HUD } = require('../gui/hud')

class Level {
  constructor() {
    this.segments = [];
    this.collision_items = new PIXI.Container();
    this.collision_items.zIndex = -10;
    this.collision_items.name = 'collision_items'

    viewport.addChild(this.collision_items);
  }
  
  create_grid(level_tiles) {
    this.grid = create_level_grid(level_tiles);
  }

  add_to_segments(item) {
    this.segments.push(
      {a:{x:item.x,y:item.y+item.height},             b:{x:item.x,y:item.y}},
      {a:{x:item.x,y:item.y},                         b:{x:item.x+item.width,y:item.y}},
      {a:{x:item.x+item.width,y:item.y+item.height},  b:{x:item.x,y:item.y+item.height}},
      {a:{x:item.x+item.width,y:item.y+item.height},  b:{x:item.x+item.width,y:item.y}},
    )
  }

  set_background_image(image, tile_data) {
    this.background_image = image;
    this.background_image.position.set(0, 0);
    this.background_image.width = tile_data.imagewidth;
    this.background_image.height = tile_data.imageheight;  
    
    this.add_to_segments(this.background_image);
    
    viewport.addChild(this.background_image);
  }

  render_walls(wall_array) {
    wall_array.objects.forEach((wall_data) => {
      const wall = PIXI.Sprite.fromFrame('black_dot');
  
      wall.position.set(wall_data.x + wall_array.offsetx, wall_data.y + wall_array.offsety- 100);
      wall.width = wall_data.width;
      wall.height = wall_data.height;
      wall.anchor.set(0); 
      wall.zIndex = -20;
      this.add_to_segments(wall);
  
      this.collision_items.addChild(wall);
    });
  }
  
  render_items(item_array) {
    item_array.x = item_array.offsetx;
    item_array.y = item_array.offsety - 100;
    
    const chest = new Chest(item_array);
    chest.add_state_handling();
  }

  render_doors(door_array) { 
    door_array.objects.forEach((door_data) => {
      const door = new Door(door_data);
      door.add_state_handling();
      door.lock().unlock().open();
    });
  }

  create_player(location){
    const character = new Player();

    character.set_position(location.x,location.y);
    character.add_aiming_line()
    character.add_aiming_cone()
    character.mouse_move();
    character.mouse_down();
    character.mouse_up();
    character.add_controls();
    character.follow_player();
    character.create_light();
    //character.add_raycasting(this.segments)
  }
 
  create_friend(location, script) {
    const friend = new Friend();
    friend.set_position(location.x,location.y);
    friend.add_dialog_handling();
    friend.add_script(script);
    friend.add_state_handling();
  } 

  create_enemy(location, path) {
    const enemy = new Enemy();
    
    enemy.set_position(location.x, location.y);
    enemy.create_direction_line();
    enemy.add_sight_line();
    enemy.add_influence_box();
    enemy.create_light();
    enemy.add_raycasting(this.segments);
    
    const formatted_path_data = format_path_data(path);
    enemy.create_patrol_path(formatted_path_data);
  }

  create_rat(location, path) {
    const rat = new Rat();
    rat.set_position(location.x, location.y);

    const formatted_path_data = format_path_data(path);
    rat.create_patrol_path(formatted_path_data)
    move_sprite_on_route_straight(rat.sprite).then(res => console.log(res));
  }
}

class Bedroom extends Level {
  constructor(data, image) { 
    super();
    
    const { 
      grid_data, 
      wall_data, 
      door_data, 
      item_data, 
      player_data, 
      enemy_data, 
      rat_data,
      friend_data,
    } = data;
    
    this.create_grid(grid_data)
    this.set_background_image(image, grid_data);
    this.render_walls(wall_data);
    this.render_doors(door_data);
    this.render_items(item_data.layers[0])
    this.create_player(player_data.position)
    this.create_enemy(enemy_data.position, enemy_data.path_data);
    this.create_rat(rat_data.position, rat_data.path_data);
    this.create_friend(friend_data.position, friend_data.script);
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

  debug_room.set_background_image(debug_room_image);
  debug_room.render_walls(options);
  debug_room.create_grid();
  // debug_room.create_enemies();
}

function format_path_data(path_data){
  const formatted_path_array = [];

  for (let i = 0; i < path_data.objects[0].polyline.length; i++) {
    const element = path_data.objects[0].polyline[i];
    const path_data2 = {
      x: element.x + path_data.objects[0].x,
      y: element.y + path_data.objects[0].y - 100,
    } 
    formatted_path_array.push(path_data2);
  }

  return formatted_path_array;
}

module.exports.load_bedroom_map = () => {
  const level_data = require('./bedroom/level_data/bedroom_level_data.json');
  const tiles_data = require('./bedroom/level_data/flat_floor_data.json');
  const bedroom_image = PIXI.Sprite.fromFrame('flat_floor2');
  const friend_script = [{"type":"Text","id":"7a69da96-639e-4292-a26f-59a47b934884","actor":"trader","name":"Welcome to a dialog option, want to \ngo to the next line?\n \n Well here we go, welcome to the end \n of the world","next":"274625c9-0d31-49a3-87dc-129a721ee698"},{"type":"Branch","id":"274625c9-0d31-49a3-87dc-129a721ee698","variable":"first choice ","branches":{"yes":"e2e31f77-0614-43b4-9e4e-b996379ea43d","no":"4f2717a2-11de-4f42-a358-907e8e3eb656"}},{"type":"Text","id":"ee68a265-ba7e-4284-856d-43d2b1c3594d","actor":"trader","name":"final node after the yes choice ","next":null},{"type":"Text","id":"e2e31f77-0614-43b4-9e4e-b996379ea43d","actor":"trader","name":"this is the first yes choice","next":"ee68a265-ba7e-4284-856d-43d2b1c3594d"},{"type":"Text","id":"4f2717a2-11de-4f42-a358-907e8e3eb656","actor":"trader","name":"this is the first no choice","next":null}];

  const bedroom_schema = {
    player_data: {
      position: {
        x: 1000,
        y: 1000,
      }
    },
    enemy_data: {
      position: {
        x: 1800,
        y: 1000,
      },
      path_data: level_data.layers[0].layers[2],
    },
    friend_data: {
      position: {
        x: 600,
        y: 1300,
      },
      script: friend_script,
    },
    rat_data: {
      position: {
        x: 2300,
        y: 1800,
      },
      path_data: level_data.layers[0].layers[3],
    },
    wall_data: level_data.layers[0].layers[1],
    door_data: level_data.layers[0].layers[4],
    item_data: level_data.layers[0].layers[5],
    grid_data: tiles_data,
  }
  
  new Bedroom(bedroom_schema, bedroom_image);
 };


