'use strict';

const { Level        } = require('../level_model');
const { Tiled_Data   } = require('../attributes/parse_tiled_data');
const { Randomise    } = require('../attributes/randomise');
const { Background   } = require('../elements/background');
const { Wall         } = require('../elements/wall');
const { Bright_Light } = require('../../light/types/bright_light');

const level_data  = require('../data/large_level.json');

class Large_Room extends Level {
  constructor(player) {
    super();
    this.name       = 'tiled_room';

    this.player     = player;
    this.elements   = new Tiled_Data(level_data);
    this.background = new Background('grid_floor');

    this._set_elements();
  }

  _set_elements() {
    global.set_light_level(0.05);
    this.player.light.hide();

    this.background.set_position({x: 1100, y: 800});
    this.background.height = 5000;
    this.background.width = 8000;

    this.elements.walls.forEach(data => {
      const wall  = new Wall();
      wall.shadow = true;
      wall.height = data.height;
      wall.width  = data.width;
      wall.anchor = 0;
      wall.set_position(data);
    });

    this.elements.item_areas.forEach(data => {
      const area = new Randomise();
      area.height = data.height;
      area.width  = data.width;
      area.alpha = 0;
      area.set_position(data);
      area.random_items();
    });

    this.elements.lights.forEach(data => {
      const light = new Bright_Light();
      light.height = data.height;
      light.width  = data.width;
      light.set_position(data);
    });
  }
}

module.exports = {
  Large_Room,
};
