'use strict';

const { Player } = require('../../character/characters/player.js');
const { Campfire } = require('../../object_management/items/fire_place');
const { Chest } = require('../../object_management/items/chest');
const { Note } = require('../../object_management/items/Note');


class DevelopmentLevel {
  constructor() {
    const player = new Player();

    player.set_position({ x: 1000, y: 1000 });
    player.add_controls();
    player.follow_player();
    player.with_light();
    this.test_chest();
    this.test_campfire();
    this.test_note();
  }

  test_note() {

    const note = new Note();
    note.set_position({ x: 900, y: 900 });
    note.without_character_collision();
    note.without_projectile_collision();
    note.immovable();

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
