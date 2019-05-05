'use strict';

const { Tiled_Data    } = require('../attributes/parse_tiled_data');
const { Trigger_Pad   } = require('../elements/pad');
const { Level_Factory } = require('./level_factory');

class Items_Room_level_2 {
  constructor(player) {
    this.name   = 'intro';
    this.player = player;

    this._set_elements();
  }

  _set_elements() {
    global.set_light_level(0.9);

    const level_data = require('../data/intro_room_level_2.json');
    const elements   = new Tiled_Data(level_data);
    Level_Factory.generate(elements);

    const { exit_pad } = elements;

    exit_pad.forEach(data => new Trigger_Pad(data, this.player));
  }
}

module.exports = {
  Items_Room_level_2,
};
