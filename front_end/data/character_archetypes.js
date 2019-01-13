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

module.exports = {
  Scavenger_Insane_Dying,
};
