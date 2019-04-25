'use strict';

const { Level         } = require('../level_model');
const { Tiled_Data    } = require('../attributes/parse_tiled_data');
const { Trigger_Pad   } = require('../elements/pad');
const { Rat           } = require('../../character/archetypes/rat');
const { Level_Factory } = require('./level_factory');

const level_data = require('../data/defend_room.json');

class Defend_Room extends Level  {
  constructor(player) {
    super();
    this.name     = 'defend_room';

    this.player   = player;
    this.elements = new Tiled_Data(level_data);

    this._set_elements();
  }

  _set_elements() {
    const {prey, exit_pad, grid} = this.elements;
    global.set_light_level(1);

    Level_Factory.generate(this.player, this.elements);

    const mouse = new Rat();
    mouse.enemy(this.player);
    mouse.set_position(prey[0]);

    exit_pad.forEach(data => {
      const pad  = new Trigger_Pad();
      pad.height = data.height;
      pad.width  = data.width;
      pad.anchor = 0;
      pad.set_position(data);
      if(data.properties) {
        pad.area.events.once('trigger', () => {
          Level_Factory.clear();

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
