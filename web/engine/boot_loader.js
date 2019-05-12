/* eslint-disable*/
'use strict';

//const { Animations_Room } = require('../level/types/player_animations');
const { Archer_Room     } = require('../level/types/archer_room');
const { Items_Room      } = require('../level/types/item_room');
const { Transition_Room } = require('../level/types/transition_room');
const { Intro           } = require('../level/types/intro.js');
const { School_Room     } = require('../level/types/school_room.js');
const { Simple          } = require('../level/types/simple.js');
const { Defend_Room     } = require('../level/types/defend_room.js');
const { Player          } = require('../character/types/player.js');

class Level_Loader {
  static boot() {
    const player = new Player();
    player.set_position({x:1000, y:700});
    player.inventory.equip('old_bow');

    new Transition_Room(player);

    // new Defend_Room(player)
    // new Intro(player);
    // new School_Room(player);
    // new Animations_Room();
    // new Archer_Room(player);
    // new Random_Room(player);
    // new Items_Room(player);
    // new Simple(player, { level_name: 'light' });
  }
}

module.exports = {
  Level_Loader,
};
