'use strict';

const { Archer_Room } = require('./archer_room');
const { clear_non_player_containers } = require('../../engine/pixi_containers');



//TODO This is not a Factory make it one and abstract this
class Level_Factory {
  static generate(type, player) {
    switch(type) {
      case 'archer': return new Archer_Room(player);
    }
  }

  static clear() {
    clear_non_player_containers();
  }

}

module.exports = {
  Level_Factory,
};
