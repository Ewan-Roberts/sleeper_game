'use strict';

const { Animations_Room } = require('../level/types/player_animations');
const { Projectile_Room } = require('../level/types/projectile_room');
const { Archer_Room     } = require('../level/types/archer_room');
const { Random_Room     } = require('../level/types/random_room');
const { Items_Room      } = require('../level/types/item_room');
const { Transition_Room } = require('../level/types/transition_room');
const { Old_Man_Room    } = require('../level/types/old_man_room');
const { Intro           } = require('../level/types/intro.js');
const { School_Room     } = require('../level/types/school_room.js');

const { Player          } = require('../character/types/player.js');

// Boot loader for testing
// archer.raycasting.add(this.level.segments);
class Level_Loader {
  static _intro(player) {
    new Intro(player);
  }

  static _school(player) {
    new School_Room(player);
  }

  static _animation() {
    new Animations_Room();
  }

  static _projectile(player) {
    new Projectile_Room(player);
  }

  static _archer(player) {
    new Archer_Room(player);
  }

  static _random(player) {
    new Random_Room(player);
  }

  static _transition(player) {
    new Transition_Room(player);
  }

  static _item_room(player) {
    new Items_Room(player);
  }

  static _old_man(player) {
    new Old_Man_Room(player);
  }

  static boot() {
    const player = new Player();
    player.set_position({x:1000, y:700});
    player.inventory.arm_ranged('old_bow');

    // this._intro(player);
    // this._school(player);
    // this._animation();
    // this._projectile(player);
    // this._archer(player);
    // this._random(player);
    // this._item_room(player);
    // this._old_man(player);

    this._transition(player);
  }
}

module.exports = {
  Level_Loader,
};
