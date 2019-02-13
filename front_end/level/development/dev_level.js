/* eslint-disable */  // --> OFF
'use strict';
const PIXI = require('pixi.js');

const { viewport  } = require('../../engine/viewport');
const { Player    } = require('../../character/types/player.js');
const { Campfire  } = require('../../items/fire_place');
const { Chest     } = require('../../items/chest');
const { Note      } = require('../../items/Note');
const { Backpack  } = require('../../items/back_pack');

const { get_item_by_name } = require('../../items/item_data');
//const { NetworkCharacter } = require('../../character/network/network_player.js');

//const { start_rain } = require('../../weather/rain');

const { Level           } = require('../level_utils');
const { intro_cutscene  } = require('../../cutscene/intro.js');
const { Enemy           } = require('../../character/types/enemy');
const { Rat             } = require('../../character/types/rat');
const { Inventory       } = require('../../character/attributes/inventory');
const { View_Inventory  } = require('../../view/view_inventory');
const { View_HUD        } = require('../../view/view_player_inventory');
const { View_Aiming_Line } = require('../../view/view_aiming_line');

const { Archer } = require('../../character/archetypes');

class DevelopmentLevel {
  constructor() {
    const player = new Player();
    player.set_position({ x: 1000, y: 1000 });
    player.follow_sprite_with_camera();
    player.with_light();
    const bow = get_item_by_name('old_bow');
    player.inventory.equip_weapon(bow);

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
    //player.add_raycasting(this.level.segments);

    this.load_test_level();
    this.test_note();

    //View_Inventory.create_inventory_slots_at({x: 1000, y: 1000}, 3);
    //inventory_test.populate_random_inventory(player);
    //inventory_test.set_inventory_position({ x: 1000, y: 1000 });
    const archer = new Archer(player);
    archer.sprite.position.set(1550,1000);
    archer.shoot(player);

    console.log('wreghbwigbwo2i');
    console.log(viewport);
    archer.raycasting.add(this.level.segments);
    archer.logic_start();
    // setInterval(() => {
    //   console.log('hi');

    //   const point = archer.raycasting.contains_point(player.sprite);
    //   console.log(point)
    //   View_Aiming_Line.add_between_sprites(player.sprite, archer.sprite);

    // }, 2000);


    //const knife = get_item_by_name('rusty_knife');
    //const enemy = new Enemy();
    //enemy.sprite.position.set(1550,1000);
    //enemy.with_light();
    //enemy.animation.weapon = 'knife';
    //enemy.inventory.equip_weapon(knife);

    //const rat = new Rat();
    //rat.set_position({x: 900, y: 1200});
    //rat.lootable_on_death();
    //rat.animation.switch('move');

    //rat.prey.is_prey_to(enemy);
    //rat.prey.is_prey_to(player);

  }

  load_flat_level() {
    const bedroom_data  = require('../bedroom/bedroom_map_output.json');
    const bedroom_tiles = require('../bedroom/bedroom_map_tiled.json');
    const bedroom_image = PIXI.Sprite.fromFrame('flat_floor2');
    bedroom_image.alpha = 0.5;

    const bedroom = new Level(bedroom_tiles, bedroom_data);
    bedroom.set_background_image(bedroom_image, bedroom_tiles);
    console.log(bedroom_data);
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







