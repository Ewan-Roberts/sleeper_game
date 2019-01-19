'use strict';

//using this this to roughly scope out some uniquq enemy types

class Scavenger_Insane_Dying {
  constructor() {
    this.description = 'this guy is on his last legs, he is insane';
    this.vitals = {
      health:   10,
      food:     4,
      water:    16,
      heat:     20,
      sleep:    10,
      status:   'alive',
      ticker_values: {
        health: 1,
        food:   1,
        water:  2,
        heat:   1,
        sleep:  2,
      },
    };

    this.equiped = 'rusty_knife';

    this.inventory.slots = [
      { name: 'rags' },
    ];

  }

}


class Fayetality {
  constructor() {
    this.description = 'unable to have people talk around her, unable to hear other players';
    this.vitals = {
      health:   80,
      food:     20,
      water:    70,
      heat:     90,
      sleep:    20,
      status:   'alive',
      ticker_values: {
        health: 1,
        food:   1,
        water:  2,
        heat:   1,
        sleep:  2,
      },
    };

    this.equiped = 'samurai_sword';

    this.inventory.slots = [
      { name: 'tin_of_beans' },
      { name: 'back_pack'    },
      { name: 'sleeping_bag' },
      { name: 'book'         },
      { name: 'watch'        },
    ];

  }

}



module.exports = {
  Scavenger_Insane_Dying,
  Fayetality,
};
