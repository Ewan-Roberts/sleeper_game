/* eslint-disable */  // --> OFF
'use strict';
const PIXI = require('pixi.js');

const { Dev_Room        } = require('./types/dev_room');
const { Pathfind_Room   } = require('./types/pathfinding_room');
const { Animations_Room } = require('./types/player_animations');
const { Intro           } = require('../cutscene/types/intro.js');

// Boot loader for testing
class Level_Loader {
  constructor() {
    // const intro_cutscene = new Intro();
    // intro_cutscene._set_elements();
    // intro_cutscene.start();

    //ANIMATION TESTS
    // const development_room = new Dev_Room();
    // const animation_room = new Animations_Room();

    // archer.raycasting.add(this.level.segments);
  }

  static boot() {

    const intro_cutscene = new Intro();
    intro_cutscene._set_elements();
    intro_cutscene.start();

    // new Pathfind_Room();
  }
}

module.exports = {
  Level_Loader,
};


