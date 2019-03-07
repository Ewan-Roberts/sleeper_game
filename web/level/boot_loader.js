'use strict';

const { Dev_Room        } = require('./types/dev_room');
const { Pathfind_Room   } = require('./types/pathfinding_room');
const { Animations_Room } = require('./types/player_animations');
const { Projectile_Room } = require('./types/projectile_room');
const { Archer_Room     } = require('./types/archer_room');
const { Shadow_Room     } = require('./types/shadow_room');
const { Random_Room     } = require('./types/random_room');
const { Intro           } = require('../cutscene/types/intro.js');

// Boot loader for testing
// archer.raycasting.add(this.level.segments);
class Level_Loader {
  static _intro() {
    const intro_cutscene = new Intro();
    intro_cutscene.start();
  }

  static _development() {
    new Dev_Room();
  }

  static _animation() {
    new Animations_Room();
  }

  static _pathfind() {
    new Pathfind_Room();
  }

  static _projectile() {
    new Projectile_Room();
  }

  static _archer() {
    new Archer_Room();
  }

  static _random() {
    new Random_Room();
  }

  static _shadow() {
    const shadow = new Shadow_Room();

    shadow.start();
  }

  static boot() {
    // this._intro();
    // this._development();
    // this._animation();
    // this._pathfind();
    // this._projectile();
    // this._archer();
    this._random();
    // this._shadow();
  }
}

module.exports = {
  Level_Loader,
};


