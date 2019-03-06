/* eslint-disable */  // --> OFF
'use strict';
const PIXI = require('pixi.js');

const { Dev_Room        } = require('./types/dev_room');
const { Pathfind_Room   } = require('./types/pathfinding_room');
const { Animations_Room } = require('./types/player_animations');
const { Projectile_Room } = require('./types/projectile_room');
const { Archer_Room     } = require('./types/archer_room');
const { Intro           } = require('../cutscene/types/intro.js');

// Boot loader for testing
// archer.raycasting.add(this.level.segments);
class Level_Loader {
  static _intro() {
    const intro_cutscene = new Intro();
    intro_cutscene._set_elements();
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


  static boot() {
    // this._intro();
    // this._development();
    this._animation();
    // this._pathfind();
    // this._projectile();
    // this._archer();
  }
}

module.exports = {
  Level_Loader,
};


