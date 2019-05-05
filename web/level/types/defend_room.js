'use strict';

const { pathfind_sprite } = require('../../engine/pathfind.js');
const { Tiled_Data      } = require('../attributes/parse_tiled_data');
const { Trigger_Pad     } = require('../elements/pad');
const { Rat             } = require('../../character/archetypes/rat');
const { Level_Factory   } = require('./level_factory');

class Defend_Room  {
  constructor(player) {
    this.name     = 'defend_room';
    this.player   = player;

    this._set_elements();
  }

  _set_elements() {
    global.set_light_level(1);
    const level_data = require('../data/defend_room.json');
    const elements = new Tiled_Data(level_data);
    Level_Factory.generate(elements);

    const { prey, exit_pad, grid, player } = elements;

    this.player.set_position(player[0]);

    const mouse = new Rat();
    mouse.enemy(this.player);
    mouse.set_position(prey[0]);

    const mouse2 = new Rat();
    mouse2.enemy(this.player);
    mouse2.set_position({x: prey[0].x +200, y: prey[0].y +100});

    exit_pad.forEach(data => {
      const pad  = new Trigger_Pad(data);

      if(data.id === 236) {
        pad.area.events.once('trigger', () => {
          mouse2.logic_start();
        });
      } else {
        pad.area.events.once('trigger', () => {
          mouse.logic_start();
        });
      }
    });

    this.grid = pathfind_sprite.create_level_grid(grid[0]);
  }
}

module.exports = {
  Defend_Room,
};
