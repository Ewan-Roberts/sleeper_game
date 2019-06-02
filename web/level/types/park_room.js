'use strict';

const { pathfind      } = require('../../engine/pathfind.js');
const { Tiled_Data    } = require('../attributes/parse_tiled_data');
const { Trigger_Pad   } = require('../elements/pad');
const { Walker        } = require('../../character/archetypes/rat');
const { Deer          } = require('../../character/archetypes/deer');
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

    this.player.set_position(player[0]);
    const zombie = new Walker(prey[0]);
    zombie.target(this.player);
    zombie.set_position(prey[0]);

    // remove first one
    prey.shift();
    const rats = prey.map(unit => {
      const rat = new Deer(unit);
      rat.set_position(unit);
      return rat;
    });

    const [trigger_pad] = exit_pad.map(data => {
      const pad  = new Trigger_Pad(data);

      if(data.id === 236) {
        pad.sprite.events.once('trigger', () => {
          rats.forEach(unit => unit.logic_start());
        });
      } else {
        pad.sprite.events.once('trigger', () => {
          zombie.logic_start();
        });
      }
      return pad;
    });
    rats.forEach(unit => unit.target(trigger_pad));

    this.grid = pathfind.create_level_grid(grid[0]);
  }
}

module.exports = {
  Park_Room,
};
