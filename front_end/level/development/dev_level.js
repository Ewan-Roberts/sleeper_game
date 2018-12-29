'use strict';

const { Player } = require('../../character/characters/player.js');
const { Campfire } = require('../../object_management/items/fire_place');
const { Chest } = require('../../object_management/items/chest');
const { Note } = require('../../object_management/items/Note');
const { Backpack } = require('../../object_management/items/back_pack');
const { NetworkCharacter } = require('../../character/network/network_player.js');

const { start_rain } = require('../../weather/rain');
const { intro_cutscene } = require('../../cutscene/intro.js');


class DevelopmentLevel {
  constructor() {
    const player = new Player();

    player.set_position({ x: 1000, y: 1000 });
    player.add_controls();
    player.follow_player();
    player.with_light();
    player.set_initial_vitals();
    player.set_ticker_amount();
    player.set_vitals_ticker();


    this.test_intro();

    //this.test_backpack(player);
    //this.test_note();

    //this.test_food();
    //this.test_chest();
    //this.test_campfire();
    //this.test_rain();
    //this.test_network_player();

  }

  test_intro() {
    intro_cutscene.start();

  }

  test_backpack(character) {
    const backpack = new Backpack();
    backpack.set_position({x: 800, y: 800});
    backpack.without_character_collision();
    backpack.without_projectile_collision();
    backpack.immovable();

    backpack.sprite.click = () => {
      character.increase_food(10);
    };
  }

  test_network_player() {

    const network_player = new NetworkCharacter();
    network_player.set_position({ x: 900, y: 900 });
    network_player.network_update();

  }

  test_rain() {
    start_rain(400, 1200, 400, 1200);
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
