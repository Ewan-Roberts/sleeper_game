
'use strict';

const { Level      } = require('../level_model');
const { Tiled_Data } = require('../attributes/parse_tiled_data');
const { Randomise  } = require('../attributes/randomise');
const { Background } = require('../elements/background');
const { Wall       } = require('../elements/wall');
const { Candle     } = require('../../light/types/candle');
const { Trigger_Pad } = require('../elements/pad');
const level_data  = require('../data/tiled_room.json');

class Tiled_Room extends Level {
  constructor(player) {
    super();
    this.name       = 'tiled_room';

    this.player     = player;
    this.elements   = new Tiled_Data(level_data);
    this.background = new Background('grid_floor');

    this._set_elements();
  }

  _set_elements() {
    global.set_light_level(0.1);
    this.player.light.hide();

    const center = this.elements.center;
    this.background.set_position({x: center.x, y: center.y});
    this.background.alpha = 0.5;

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
      // area.anchor = 0;
      area.height = data.height;
      area.width  = data.width;
      area.alpha = 0.2;
      area.set_position(data);
      area.random_items();
    });

    this.elements.lights.forEach(data => {
      const light = new Candle();
      light.height = data.height;
      light.width  = data.width;
      light.set_position(data);
    });

    this.elements.exit.forEach(data => {
      const pad = new Trigger_Pad();
      pad.height = data.height;
      pad.width  = data.width;
      pad.anchor = 0;
      pad.set_position(data);
    });
  }
}

module.exports = {
  Tiled_Room,
};
