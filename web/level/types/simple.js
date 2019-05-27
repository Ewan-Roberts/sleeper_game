'use strict';
const { Tiled_Data    } = require('../attributes/parse_tiled_data');
const { Trigger_Pad   } = require('../elements/pad');
const { Level_Factory } = require('./level_factory');

class Simple {
  constructor(player, properties) {
    this.name = properties.level_name;

    this.level_data;
    if(properties.level_name === 'apartment') {
      this.level_data = require('../data/apartment.json');
    }

    this.player = player;

    this._set_elements();
  }

  _set_elements() {
    const elements = new Tiled_Data(this.level_data);
    const { exit_pad, player } = elements;

    this.player.set_position(player[0]);

    exit_pad.forEach(data => new Trigger_Pad(data, this.player));

    Level_Factory.generate(elements);
  }
}

module.exports = {
  Simple,
};
