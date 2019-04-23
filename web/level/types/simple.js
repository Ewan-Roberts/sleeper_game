'use strict';

const { Level         } = require('../level_model');
const { Tiled_Data    } = require('../attributes/parse_tiled_data');
const { Trigger_Pad   } = require('../elements/pad');
const { Level_Factory } = require('./level_factory');

class Simple extends Level  {
  constructor(player, properties) {
    super();
    let level_data;

    global.set_light_level(0.9);
    // TODO manage this dynamically
    if(properties.level_name === 'truck') {
      level_data = require('../data/truck.json');
    }

    if(properties.level_name === 'apartment') {
      level_data = require('../data/apartment.json');
    }

    if(properties.level_name === 'light') {
      level_data = require('../data/lights_room.json');
      global.set_light_level(0.5);
    }
    this.name     = properties.level_name;

    this.player   = player;
    this.elements = new Tiled_Data(level_data);

    this._set_elements();
  }

  _set_elements() {
    const {exit_pad} = this.elements;

    exit_pad.forEach(data => {
      const pad  = new Trigger_Pad();
      pad.height = data.height;
      pad.width  = data.width;
      pad.anchor = 0;
      pad.set_position(data);

      // Fire once (event) to load in enemies
      pad.area.events.once('trigger', () => {
        Level_Factory.clear();
        Level_Factory.create(data.properties, this.player);
      });
    });

    Level_Factory.generate(this.player, this.elements);
  }
}

module.exports = {
  Simple,
};
