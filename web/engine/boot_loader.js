'use strict';

const { Dev_Room        } = require('../level/types/dev_room');
const { Pathfind_Room   } = require('../level/types/pathfinding_room');
const { Animations_Room } = require('../level/types/player_animations');
const { Projectile_Room } = require('../level/types/projectile_room');
const { Archer_Room     } = require('../level/types/archer_room');
const { Shadow_Room     } = require('../level/types/shadow_room');
const { Random_Room     } = require('../level/types/random_room');
const { Items_Room      } = require('../level/types/item_room');
const { Transition_Room } = require('../level/types/transition_room');
const { Scavenge_Room   } = require('../level/types/scavenge_room');
const { Outside_Room    } = require('../level/types/outside_room');
const { Old_Man_Room    } = require('../level/types/old_man_room');
const { Tiled_Room      } = require('../level/types/tiles_room');
const { Tiled_Prey      } = require('../level/types/tiled_prey');
const { Tiled_Prey_Path } = require('../level/types/tiled_prey_path');
const { Large_Room      } = require('../level/types/large_level');
const { Tiled_Homestead } = require('../level/types/tiled_homestead_room');
const { Intro           } = require('../level/types/intro.js');
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

  static _scavenge(player){
    new Scavenge_Room(player);
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

  static _old_man(player) {
    new Old_Man_Room(player);
  }

  static boot() {
    const player = new Player();
    player.set_position({x:1000, y:700});
    player.inventory.arm_ranged('old_bow');

    this._old_man(player);
    // this._tiled_prey_path(player);
    // this._scavenge(player);
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
