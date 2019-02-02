/* eslint-disable */  // --> OFF

'use strict';
const PIXI = require('pixi.js');

const { viewport  } = require('../../engine/viewport');

const { Player    } = require('../../character/types/player.js');
const { Campfire  } = require('../../items/fire_place');
const { Chest     } = require('../../items/chest');
const { Note      } = require('../../items/Note');
const { Backpack  } = require('../../items/back_pack');
const { Level     } = require('../level_utils');

//const { NetworkCharacter } = require('../../character/network/network_player.js');

//const { start_rain } = require('../../weather/rain');
const { intro_cutscene  } = require('../../cutscene/intro.js');
const { Enemy           } = require('../../character/types/enemy');
const { Rat             } = require('../../character/types/rat');
const { Inventory       } = require('../../character/attributes/inventory');

class DevelopmentLevel {
  constructor() {
    const player = new Player();
    player.set_position({ x: 1000, y: 1000 });
    player.follow_sprite_with_camera();
    player.with_light();
    player.add_controls();
    this.test_load_test_level();
    //player.add_raycasting(this.level.segments);

    this.test_note();

    const inventory_test = new Inventory();

    //TODO This is a hack I need some way to bind to the player model while testing
    inventory_test.populate_random_inventory(player);
    inventory_test.set_inventory_position({ x: 1000, y: 1000 });

    //const enemy = new Enemy();
    //console.log(enemy);
    //enemy.sprite.position.set(1550,1000);
    //enemy.with_light();

    //const rat = new Rat();
    //rat.set_position({x: 900, y: 1200});
    //rat.lootable_on_death();

    //rat.is_prey_to(enemy);
    //rat.is_prey_to(player);

    //enemy.is_predator_to(rat);

    //pathfind_from_enemy_to_player(rat.sprite, player.sprite);

    //this.test_backpack();
    //this.test_intro();
    //this.test_food();
    //this.test_chest();
    //this.test_campfire();
    //this.test_rain();
    //this.test_network_player();

  }

  test_load_test_level() {

    const debug_room_tiled_data = require('../debug/playground/map2_output.json');
    const debug_room_tiled_tiles = require('../debug/playground/map2_tiles.json');
    const debug_room_image = PIXI.Sprite.fromFrame('debug_room');
    debug_room_image.alpha= 0.5;

    const debug_room = new Level(debug_room_tiled_data, debug_room_tiled_tiles);

    debug_room.set_background_image(debug_room_image, debug_room_tiled_tiles);
    debug_room.render_walls(debug_room_tiled_data.layers[1]);
    debug_room.create_grid(debug_room_tiled_tiles);
    this.level = debug_room;
  }

  test_rat() {
    const rat = new Rat();
    rat.set_position({x: 1100, y: 1000});
    //rat.move_to_point({x: 1400, y: 1400});
    rat.add_influence_box();
    rat.distance_to_player();
    rat.add_direction_line();
    //pathfind_from_enemy_to_player(rat.sprite, );

    //highlight_grid_cell_from_point(grid_sprite);

  }

  test_intro() {
    intro_cutscene.start();
  }

  test_backpack() {
    const backpack = new Backpack();
    backpack.set_position({x: 800, y: 800});
    backpack.without_character_collision();
    backpack.without_projectile_collision();
    backpack.immovable();

  }

  test_network_player() {

    const network_player = new NetworkCharacter();
    network_player.set_position({ x: 900, y: 900 });
    network_player.network_update();

  }

  test_rain() {
    //start_rain(400, 1200, 400, 1200);
  }

  test_note() {

    const note = new Note();
    note.set_position({ x: 900, y: 900 });
    note.without_character_collision();
    note.without_projectile_collision();
    note.immovable();
    note.with_action_on_click();

  }

  test_chest() {

    const chest = new Chest();
    chest.set_position({ x: 700, y: 700 });
    chest.with_character_collision();
    chest.without_projectile_collision();
    chest.moveable();

  }

  test_campfire() {

    const campfire = new Campfire();
    campfire.set_position({x: 1100, y: 1100});
    campfire.with_character_collision();
    campfire.moveable();

  }
}

module.exports = {
  DevelopmentLevel,
};







