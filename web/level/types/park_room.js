'use strict';

const { pathfind      } = require('../../engine/pathfind.js');
const { Tiled_Data    } = require('../attributes/parse_tiled_data');
const { Trigger_Pad   } = require('../elements/pad');
const { Rat           } = require('../../character/archetypes/rat');
const { Deer          } = require('../../character/archetypes/deer');
const { Level_Factory } = require('./level_factory');

class Park_Room  {
  constructor(player) {
    this.name     = 'defend_room';
    this.player   = player;

    this._set_elements();
  }

  _set_elements() {
    const level_data = require('../data/park_room.json');
    const elements = new Tiled_Data(level_data);
    Level_Factory.generate(elements);

    const { prey, exit_pad, grid, player } = elements;

    this.player.set_position(player[0]);
    const mouse = new Rat(prey[0]);
    mouse.target(this.player);
    mouse.set_position(prey[0]);

    const mouse2 = new Deer(prey[1]);
    mouse2.set_position(prey[1]);

    const [thing] = exit_pad.map(data => {
      const pad  = new Trigger_Pad(data);

      if(data.id === 236) {
        pad.sprite.events.once('trigger', () => {
          mouse2.logic_start();
        });
      } else {
        pad.sprite.events.once('trigger', () => {
          mouse.logic_start();
        });
      }
      return pad;
    });
    mouse2.target(thing);

    this.grid = pathfind.create_level_grid(grid[0]);
  }
}

module.exports = {
  Park_Room,
};
