'use strict';
const { Level      } = require('../level_model');
const { Tiled_Data } = require('../attributes/parse_tiled_data');
const { Background } = require('../elements/background');
const { Wall       } = require('../elements/wall');
const { Candle     } = require('../../light/types/candle');
const { Rat        } = require('../../character/archetypes/rat');
const level_data     = require('../data/tiled_room.json');

class Tiled_Prey extends Level {
  constructor(player) {
    super();
    this.name       = 'tiled_room';

    this.player     = player;
    this.elements   = new Tiled_Data(level_data);

    this._set_elements();
  }

  _set_elements() {
    global.set_light_level(1);
    const {prey, background, walls, lights} = this.elements;

    this.background = new Background(background);

    this.player.light.hide();

    prey.forEach(data => {
      const prey = new Rat();
      prey.enemy(this.player);
      prey.logic_start();
      prey.set_position(data);
    });

    walls.forEach(data => {
      const wall  = new Wall();
      wall.shadow = true;
      wall.height = data.height;
      wall.width  = data.width;
      wall.anchor = 0;
      wall.set_position(data);
    });

    lights.forEach(data => {
      const light = new Candle();
      light.height = data.height;
      light.width  = data.width;
      light.set_position(data);
    });

    this.create_grid(background);
  }
}

module.exports = {
  Tiled_Prey,
};
