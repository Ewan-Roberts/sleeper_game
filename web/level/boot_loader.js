'use strict';

const { Dev_Room        } = require('./types/dev_room');
const { Pathfind_Room   } = require('./types/pathfinding_room');
const { Animations_Room } = require('./types/player_animations');
const { Projectile_Room } = require('./types/projectile_room');
const { Archer_Room     } = require('./types/archer_room');
const { Shadow_Room     } = require('./types/shadow_room');
const { Random_Room     } = require('./types/random_room');
const { Items_Room      } = require('./types/item_room');
const { Transition_Room } = require('./types/transition_room');
const { Outside_Room    } = require('./types/outside_room');
const { Tiled_Room      } = require('./types/tiles_room');
const { Tiled_Prey      } = require('./types/tiled_prey');
const { Tiled_Prey_Path } = require('./types/tiled_prey_path');
const { Large_Room      } = require('./types/large_level');
const { Tiled_Homestead } = require('./types/tiled_homestead_room');
const { Intro           } = require('../cutscene/types/intro.js');
const { Player          } = require('../character/types/player.js');

// Boot loader for testing
// archer.raycasting.add(this.level.segments);
class Level_Loader {
  static _intro(player) {
    const intro_cutscene = new Intro(player);
    intro_cutscene.start();
  }

  static _development(player) {
    new Dev_Room(player);
  }

  static _outside(player) {
    new Outside_Room(player);
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
    const new_level = new Transition_Room(player);
    new_level.set_elements({x:0,y:player.sprite.y});

    new Transition_Room(player);
  }

  static _tiled_homestead(player) {
    new Tiled_Homestead(player);
  }

  static _tiled_created(player) {
    new Tiled_Room(player);
  }

  static _tiled_prey(player) {
    new Tiled_Prey(player);
  }

  static _tiled_prey_path(player) {
    new Tiled_Prey_Path(player);
  }

  static _item_room(player) {
    new Items_Room(player);
  }

  static _tiled_large(player) {
    new Large_Room(player);
  }

  static _shadow(player) {
    const shadow = new Shadow_Room(player);

    shadow.start();
  }

  static boot() {
    const player = new Player();
    player.set_position({x:1000, y:700});
    player.inventory.arm_ranged('old_bow');

    this._tiled_prey_path(player);
    // this._tiled_created(player);
    // this._tiled_prey(player);
    // this._tiled_large(player);
    // this._tiled_homestead(player);
    // this._item_room(player);
    // this._outside(player);
    // this._intro(player);
    // this._development(player);
    // this._animation();
    // this._pathfind(player);
    // this._projectile(player);
    // this._archer(player);
    // this._random(player);
    // this._shadow(player);
    // this._transition(player);
  }
}

module.exports = {
  Level_Loader,
};
