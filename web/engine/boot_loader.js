/* eslint-disable*/
'use strict';

//const { Animations_Room } = require('../level/types/player_animations');
// const { Items_Room      } = require('../level/types/item_room');
const { Transition_Room } = require('../level/types/transition_room');
// const { Intro           } = require('../level/types/intro.js');
// const { Simple          } = require('../level/types/simple.js');
// const { Defend_Room     } = require('../level/types/defend_room.js');
const { Player          } = require('../character/archetypes/player.js');

class Level_Loader {
  static boot() {

    new Transition_Room();

    // new Defend_Room(player)
    // new Intro(player);
    // new Animations_Room();
    // new Random_Room(player);
    // new Items_Room(player);
  }
}

module.exports = {
  Level_Loader,
};
