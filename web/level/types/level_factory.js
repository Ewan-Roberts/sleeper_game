'use strict';

const { Intro       } = require('./intro');
const { clear_non_player_containers } = require('../../engine/pixi_containers');


//TODO This is not a Factory make it one and abstract this
class Level_Factory {
  static generate(type, player) {
    const { Archer_Room } = require('./archer_room');
    const { School_Room } = require('./school_room');
    const { Items_Room  } = require('./item_room');
    const { Items_Room_level_2  } = require('./intro_level_02');
    console.log(Items_Room_level_2);
    switch(type) {
      case 'archer': return new Archer_Room(player);
      case 'intro' : return new Intro(player);
      case 'intro_level_02' : return new Items_Room_level_2(player);
      case 'school': return new School_Room(player);
      case 'item'  : return new Items_Room(player);
      default      : console.log(`error... missing level ${type}`);
    }
  }

  static clear() {
    clear_non_player_containers();
  }

}

module.exports = {
  Level_Factory,
};
