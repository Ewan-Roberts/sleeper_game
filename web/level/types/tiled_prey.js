'use strict';

const { Level      } = require('../level_model');
const { Tiled_Data } = require('../attributes/parse_tiled_data');
const { Background } = require('../elements/background');
const { Wall       } = require('../elements/wall');
const { Candle     } = require('../../light/types/candle');
const { Rat        } = require('../../character/archetypes/rat');
const level_data  = require('../data/tiled_room.json');
const level_tiled = require('../data/tiled_room_tiled.json');

class Tiled_Prey extends Level {
  constructor(player) {
    super();
    this.name       = 'tiled_room';

    this.player     = player;
    this.elements   = new Tiled_Data(level_data);
    this.background = new Background('grid_floor');

    this._set_elements();
  }

  _set_elements() {
    global.set_light_level(1);
    this.player.light.hide();

    this.background.set_position({x: 1100, y: 800});
    this.background.alpha = 0.5;

    this.add_to_segments(this.background.sprite);
    this.create_grid(level_tiled);

    this.elements.prey.forEach(data => {
      const prey = new Rat();
      prey.enemy(this.player);
      prey.logic_start();
      prey.set_position(data);
    });

    this.elements.walls.forEach(data => {
      const wall  = new Wall();
      wall.shadow = true;
      wall.height = data.height;
      wall.width  = data.width;
      wall.anchor = 0;
      wall.set_position(data);
    });

    this.elements.lights.forEach(data => {
      const light = new Candle();
      light.height = data.height;
      light.width  = data.width;
      light.set_position(data);
    });
  }
}

module.exports = {
  Tiled_Prey,
};