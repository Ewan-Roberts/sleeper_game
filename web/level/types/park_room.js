'use strict';

const { pathfind      } = require('../../engine/pathfind.js');
const { Tiled_Data    } = require('../attributes/parse_tiled_data');
const { Trigger_Pad   } = require('../elements/pad');
const { Rat           } = require('../../character/archetypes/rat');
const { Deer          } = require('../../character/archetypes/deer');
const { Level_Factory } = require('./level_factory');
const { Player        } = require('../../character/archetypes/player');

class Park_Room  {
  constructor() {
    this.name     = 'defend_room';

    this._set_elements();
  }

  _set_elements() {
    const player_character= new Player();

    const level_data = require('../data/park_room.json');
    const elements = new Tiled_Data(level_data);
    Level_Factory.generate(elements);

    const { prey, exit_pad, grid, player } = elements;

    player_character.set_position(player[0]);
    const mouse = new Rat(prey[0]);
    mouse.target(player_character);
    mouse.set_position(prey[0]);
    // remove first one
    prey.shift();
    const set_prey = prey.map(rat => {
      const unit = new Deer(rat);
      unit.set_position(rat);
      return unit;
    });

    const [trigger_pad] = exit_pad.map(data => {
      const pad  = new Trigger_Pad(data);

      if(data.id === 236) {
        pad.sprite.events.once('trigger', () => {
          set_prey.forEach(unit => unit.logic_start());
        });
      } else {
        pad.sprite.events.once('trigger', () => {
          mouse.logic_start();
        });
      }
      return pad;
    });
    set_prey.forEach(unit => unit.target(trigger_pad));

    this.grid = pathfind.create_level_grid(grid[0]);
  }
}

module.exports = {
  Park_Room,
};
