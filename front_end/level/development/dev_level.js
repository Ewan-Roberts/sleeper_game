/* eslint-disable */  // --> OFF
'use strict';
const PIXI = require('pixi.js');

const { world    } = require('../../engine/shadows');
const { Campfire } = require('../../items/fire_place');
const { Chest    } = require('../../items/chest');
const { Note     } = require('../../items/Note');
const { Backpack } = require('../../items/back_pack');

const { Level          } = require('../level_utils');
const { intro_cutscene } = require('../../cutscene/intro.js');
const { Enemy          } = require('../../character/types/enemy');
const { Inventory      } = require('../../character/attributes/inventory');
const { View_Inventory } = require('../../view/view_inventory');
const { View_HUD       } = require('../../view/view_player_inventory');

const { Player } = require('../../character/types/player.js');
const { Archer } = require('../../character/archetypes/archer');
const { Rat    } = require('../../character/archetypes/rat');

// THIS IS ALL FOR TESTING
class DevelopmentLevel {
  constructor() {
    const player = new Player();
    player.set_position({ x: 1000, y: 400});

    // dev bow for testing one hit kill
    player.inventory.add_ranged_weapon_by_name('dev_bow');
    player.inventory.add_melee_weapon_by_name('rusty_knife');
    player.inventory.equip_weapon_by_name('dev_bow');

    View_HUD.add_head('old_bandana');
    View_HUD.add_hat('old_helmet');
    View_HUD.add_chest('old_clothes');
    View_HUD.add_shoes('old_boots');
    //View_HUD.add_background('merc_portrait');
    View_HUD.add_primary_weapon('wrench_blade');
    View_HUD.add_secondary_weapon('rusty_knife');
    View_HUD.inventory_slot('rat_leg_bone', 0);
    View_HUD.inventory_slot('rat_femur', 1);
    View_HUD.inventory_slot('meat', 2);
    View_HUD.inventory_slot('skull_cap_bone', 3);

    this.load_test_level();
    this.test_note();



    const rat = new Rat(player);
    rat.set_position({x: 900, y: 1100});
    rat.animation.switch('move');
    rat.logic_start();

    // TODO: remove from the input of a class to enemy_of
    const archer = new Archer(rat);
    archer.sprite.position.set(1550,1000);
    archer.logic_start();
    archer.raycasting.add(this.level.segments);

  }

  load_flat_level() {
    const bedroom_data  = require('../bedroom/bedroom_map_output.json');
    const bedroom_tiles = require('../bedroom/bedroom_map_tiled.json');
    const bedroom_image = PIXI.Sprite.fromFrame('flat_floor2');
    bedroom_image.alpha = 0.5;

    const bedroom = new Level(bedroom_tiles, bedroom_data);
    bedroom.set_background_image(bedroom_image, bedroom_tiles);
    bedroom.render_walls(bedroom_data.layers[0].layers[1]);
    bedroom.create_grid(bedroom_tiles);
    this.level = bedroom;
  }

  load_test_level() {

    const debug_room_tiled_data = require('../debug/debug_map_output.json');
    const debug_room_tiled_tiles = require('../debug/debug_map_tiles.json');
    const debug_room_image = PIXI.Sprite.fromFrame('debug_room');
    debug_room_image.alpha= 0.5;

    const debug_room = new Level(debug_room_tiled_data, debug_room_tiled_tiles);
    debug_room.set_background_image(debug_room_image, debug_room_tiled_tiles);
    debug_room.render_walls(debug_room_tiled_data.layers[1]);
    debug_room.create_grid(debug_room_tiled_tiles);
    this.level = debug_room;
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







