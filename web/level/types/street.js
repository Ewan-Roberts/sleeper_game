'use strict';

const { Level         } = require('../level_model');
const { Tiled_Data    } = require('../attributes/parse_tiled_data');
const { Trigger_Pad   } = require('../elements/pad');
const { Level_Factory } = require('./level_factory');

const level_data = require('../data/street.json');

class Street extends Level  {
  constructor(player) {
    super();
    this.name     = 'school_room';
    this.player   = player;
    this.elements = new Tiled_Data(level_data);
    this._set_elements();
  }

  _set_elements() {
    global.set_light_level(0.9);
    const {exit_pad, player} = this.elements;
    this.player.set_position(player[0]);

    exit_pad.forEach(data => {
      const pad  = new Trigger_Pad(data);
      pad.area.events.once('trigger', () => {
        Level_Factory.create(data.properties, this.player);
      });
    });

    Level_Factory.generate(this.player, this.elements);
  }
}

module.exports = {
  Street,
};
