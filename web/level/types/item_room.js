'use strict';

const { Level         } = require('../level_model');
const { Tiled_Data    } = require('../attributes/parse_tiled_data');
const { Trigger_Pad   } = require('../elements/pad');
const { Lighter       } = require('../../light/types/lighter');
const { Level_Factory } = require('./level_factory');

const level_data  = require('../data/items_room.json');

class Items_Room extends Level {
  constructor(player) {
    super();
    this.name     = 'item_room';

    this.player   = player;
    this.elements = new Tiled_Data(level_data);
    this.lighter  = new Lighter();

    this._set_elements();
  }

  _set_elements() {
    const {exit_pad} = this.elements;
    global.set_light_level(0.4);

    Level_Factory.generate(this.player, this.elements);

    exit_pad.forEach(data => {
      const pad  = new Trigger_Pad();
      pad.height = data.height;
      pad.width  = data.width;
      pad.anchor = 0;
      pad.set_position(data);
    });
  }
}

module.exports = {
  Items_Room,
};
