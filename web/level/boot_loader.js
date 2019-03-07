'use strict';

const { Dev_Room        } = require('./types/dev_room');
const { Pathfind_Room   } = require('./types/pathfinding_room');
const { Animations_Room } = require('./types/player_animations');
const { Projectile_Room } = require('./types/projectile_room');
const { Archer_Room     } = require('./types/archer_room');
const { Shadow_Room     } = require('./types/shadow_room');
const { Random_Room     } = require('./types/random_room');
const { Transition_Room } = require('./types/transition_room');
const { Intro           } = require('../cutscene/types/intro.js');
const { Player          } = require('../character/types/player.js');

// Boot loader for testing
// archer.raycasting.add(this.level.segments);
class Level_Loader {
  static _intro(player) {
    const intro_cutscene = new Intro(player);
    intro_cutscene.start();
  }

  static _development() {
    new Dev_Room();
  }

  static _animation() {
    new Animations_Room();
  }

  static _pathfind(player) {
    new Pathfind_Room(player);
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

  static _shadow(player) {
    const shadow = new Shadow_Room(player);

    shadow.start();
  }

  static boot() {
    const player = new Player();
    player.set_position({x:800, y:500});

    // this._intro(player);
    // this._development();
    // this._animation();
    // this._pathfind(player);
    // this._projectile(player);
    // this._archer(player);
    // this._random(player);
    // this._shadow(player);
    this._transition(player);
  }
}

module.exports = {
  Level_Loader,
};

