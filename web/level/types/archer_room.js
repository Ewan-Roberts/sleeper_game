'use strict';
const { pathfind      } = require('../../engine/pathfind.js');
const { visual        } = require('../../utils/render.js');
const { Tiled_Data    } = require('../attributes/parse_tiled_data');
const { Trigger_Pad   } = require('../elements/pad');
const { Level_Factory } = require('./level_factory');
const { Click_Pad     } = require('../elements/click_pad');
const { Deer          } = require('../../character/archetypes/deer');

class Archer_Room {
  constructor(player) {
    this.name   = 'archer_room';
    this.player = player;

    this._set_elements();
  }

  _set_elements() {
    const level_data = require('../data/archer_room.json');
    const elements = new Tiled_Data(level_data);
    Level_Factory.generate(elements);

    const { click_pad, prey, exit_pad, player, grid, unique } = elements;
    this.player.set_position(player[0]);

    const unique_point = visual(unique[0]);

    exit_pad.forEach(data => new Trigger_Pad(data, this.player));

    const mice = prey.map(entity => {
      const mouse = new Deer(entity);
      mouse.set_position(entity);
      mouse.target(unique_point);
      return mouse;
    });

    click_pad.forEach(data => {
      const pad = new Click_Pad(data);

      pad.click = () => mice.forEach(mouse => mouse.logic_start());
    });

    this.grid = pathfind.create_level_grid(grid[0]);
  }
}

module.exports = {
  Archer_Room,
};
