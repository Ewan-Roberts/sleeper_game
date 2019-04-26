'use strict';

const { Level         } = require('../level_model');
const { Tiled_Data    } = require('../attributes/parse_tiled_data');
const { Trigger_Pad   } = require('../elements/pad');
const { Rat           } = require('../../character/archetypes/rat');
const { Level_Factory } = require('./level_factory');


class Defend_Room extends Level  {
  constructor(player) {
    const level_data = require('../data/defend_room.json');
    super();
    this.name     = 'defend_room';

    this.player   = player;
    this.elements = new Tiled_Data(level_data);

    this._set_elements();
  }

  _set_elements() {
    const {prey, exit_pad, grid, player} = this.elements;
    global.set_light_level(1);

    this.player.set_position(player[0]);
    Level_Factory.generate(this.player, this.elements);

    const mouse = new Rat();
    mouse.enemy(this.player);
    mouse.set_position(prey[0]);

    exit_pad.forEach(data => {
      const pad  = new Trigger_Pad(data);
      if(data.properties) {
        pad.area.events.once('trigger', () => {
          Level_Factory.create(data.properties, this.player);
        });
        return;
      }

      // Fire once (event) to load in enemies
      pad.area.events.once('trigger', () => {
        mouse.logic_start();
      });
    });

    global.set_light_level(1);
    this.create_grid(grid[0]);
  }
}

module.exports = {
  Defend_Room,
};
