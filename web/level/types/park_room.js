'use strict';

const { pathfind      } = require('../../engine/pathfind.js');
const { Tiled_Data    } = require('../attributes/parse_tiled_data');
const { Trigger_Pad   } = require('../elements/pad');
const { Walker        } = require('../../character/archetypes/rat');
const { Level_Factory } = require('./level_factory');
const { Player        } = require('../../character/archetypes/player');
const level_data        = require('../data/park_room.json');

class Park_Room  {
  constructor() {
    this.name     = 'defend_room';
    this.player   = new Player();
    this.elements = new Tiled_Data(level_data);

    this._set_elements();
  }

  _set_elements() {
    Level_Factory.generate(this.elements);
    const { prey, exit_pad, grid, player } = this.elements;

    this.player.position.copy(player[0]);
    const zombie = new Walker(prey[0]);
    zombie.target(this.player);
    zombie.position.set(prey[0]);

    // remove first one
    prey.shift();

    const [trigger_pad] = exit_pad.map(data => {
      const pad  = new Trigger_Pad(data);

      if(data.id === 236) {
        pad.events.once('trigger', () => {
          prey.forEach((unit,i) => {
            const zombie = new Walker(unit);
            zombie.target(trigger_pad);
            zombie.position.copy(unit);
            if(i % 2) zombie.animation.eat();
            zombie.logic_start();
            return zombie;
          });
        });
      } else {
        pad.events.once('trigger', () => {
          zombie.logic_start();
        });
      }
      return pad;
    });

    this.grid = pathfind.create_level_grid(grid[0]);
  }
}

module.exports = {
  Park_Room,
};
