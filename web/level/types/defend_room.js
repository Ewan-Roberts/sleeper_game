'use strict';

const { pathfind      } = require('../../engine/pathfind.js');
const { Tiled_Data    } = require('../attributes/parse_tiled_data');
const { Trigger_Pad   } = require('../elements/pad');
const { Rat           } = require('../../character/archetypes/rat');
const { Player } = require('../../character/archetypes/player');
const { Level_Factory } = require('./level_factory');

class Defend_Room  {
  constructor() {
    this.name     = 'defend_room';

    this._set_elements();
  }

  _set_elements() {
    const player_character = new Player();

    const level_data = require('../data/defend_room.json');
    const elements = new Tiled_Data(level_data);
    Level_Factory.generate(elements);

    const { prey, exit_pad, grid, player } = elements;

    player_character.set_position(player[0]);

    const zombies = prey.map(unit => {
      const zombie = new Rat(unit);
      zombie.target(player_character);
      zombie.set_position(unit);
      return zombie;
    });

    exit_pad.forEach(data => {
      const pad  = new Trigger_Pad(data);

      pad.sprite.events.once('trigger', () => {
        zombies.forEach(unit => unit.logic_start());
      });
      return pad;
    });

    this.grid = pathfind.create_level_grid(grid[0]);
  }
}

module.exports = {
  Defend_Room,
};
