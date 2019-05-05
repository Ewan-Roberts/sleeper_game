'use strict';

const { Tiled_Data    } = require('../attributes/parse_tiled_data');
const { Trigger_Pad   } = require('../elements/pad');
const { Level_Factory } = require('./level_factory');

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

    const { exit_pad } = elements;

    exit_pad.forEach(data => new Trigger_Pad(data));
  }
}

module.exports = {
  Archer_Room,
};
