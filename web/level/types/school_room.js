'use strict';

const { pathfind_sprite } = require('../../engine/pathfind.js');
const { Tiled_Data      } = require('../attributes/parse_tiled_data');
const { Trigger_Pad     } = require('../elements/pad');
const { Rat             } = require('../../character/archetypes/rat');
const { Phone           } = require('../elements/phone');
const { Level_Factory   } = require('./level_factory');

class School_Room {
  constructor(player) {
    this.name     = 'school_room';
    this.player   = player;

    this._set_elements();
  }

  _set_elements() {
    const level_data = require('../data/school_room.json');
    const elements = new Tiled_Data(level_data);
    Level_Factory.generate(elements);

    const { prey, exit_pad, grid, player } = elements;
    global.set_light_level(0.9);

    this.player.set_position(player[0]);

    const mouse = new Rat();
    mouse.enemy(this.player);
    mouse.set_position(prey[0]);

    const phone = new Phone({image_name: 'phone_00'});
    phone.width  = 200;
    phone.height = 200;
    phone.set_position({x: 800, y: 810});

    exit_pad.forEach(data => {
      const { area } = new Trigger_Pad(data, this.player);
      area.events.once('trigger', () => mouse.logic_start());
    });

    this.grid = pathfind_sprite.create_level_grid(grid[0]);
  }
}

module.exports = {
  School_Room,
};
