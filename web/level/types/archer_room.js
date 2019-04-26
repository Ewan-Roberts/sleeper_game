'use strict';

const { Level         } = require('../level_model');
const { Tiled_Data    } = require('../attributes/parse_tiled_data');
const { Trigger_Pad   } = require('../elements/pad');
const { Level_Factory } = require('./level_factory');


class Archer_Room extends Level {
  constructor(player) {
    const level_data = require('../data/archer_room.json');
    super();
    this.name     = 'archer_room';

    this.player   = player;
    this.elements = new Tiled_Data(level_data);

    this._set_elements();
  }

  _set_elements() {
    Level_Factory.generate(this.player, this.elements);

    const {exit_pad} = this.elements;

    exit_pad.forEach(data => {
      const pad  = new Trigger_Pad(data);
      pad.area.events.on('trigger', () => {
        Level_Factory.create(data.properties, this.player);
      });
    });
  }
}

module.exports = {
  Archer_Room,
};
