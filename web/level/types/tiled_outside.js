'use strict';
const { Level      } = require('../level_model');
const { Tiled_Data } = require('../attributes/parse_tiled_data');
const { Background } = require('../elements/background');
const { Wall       } = require('../elements/wall');
const { Candle     } = require('../../light/types/candle');
const { Rat        } = require('../../character/archetypes/rat');

const { Element_Factory } = require('../elements/elements_factory');

const level_data  = require('../data/outside_room.json');

class Outside_Map extends Level {
  constructor(player) {
    super();
    this.name       = 'outside_room';

    this.player     = player;
    this.elements   = new Tiled_Data(level_data);

    this._set_elements();
  }

  async _set_elements() {
    global.set_light_level(1);

    const {prey, background, walls, lights, furnishing} = this.elements;

    this.background = new Background(background, true);

    this.player.light.hide();

    furnishing.forEach(data => {
      Element_Factory.generate_tiled(data);
    });

    walls.forEach(data => {
      const wall  = new Wall();
      wall.shadow = true;
      wall.height = data.height;
      wall.width  = data.width;
      wall.anchor = 0;
      wall.rotation = (data.rotation * (Math.PI/180));

      wall.set_position(data);
    });

    prey.forEach(data => {
      const prey = new Rat();
      prey.enemy(this.player);
      prey.logic_start();
      prey.set_position(data);
    });

    lights.forEach(data => {
      const light  = new Candle();
      light.height = data.height;
      light.width  = data.width;
      light.set_position(data);
    });

    // this.create_grid(background);
  }
}

module.exports = {
  Outside_Map,
};
