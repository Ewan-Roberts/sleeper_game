'use strict';

const { pathfind      } = require('../../engine/pathfind.js');
const { Tiled_Data    } = require('../attributes/parse_tiled_data');
const { Trigger_Pad   } = require('../elements/pad');
const { Walker        } = require('../../character/archetypes/rat');
const { Player        } = require('../../character/archetypes/player');
const { Level_Factory } = require('./level_factory');
const level_data        = require('../data/defend_room.json');

class Defend_Room  {
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

    const zombies = prey.map(unit => {
      const zombie = new Walker(unit);
      zombie.target(this.player);
      zombie.set_position(unit);
      return zombie;
    });

    exit_pad.forEach(data => {
      const pad = new Trigger_Pad(data);

      pad.sprite.events.once('trigger', () => {
        zombies.forEach(unit => unit.logic_start());
      });
      return pad;
    });

    pathfind.create_level_grid(grid[0]);
  }
}

module.exports = {
  Defend_Room,
};
