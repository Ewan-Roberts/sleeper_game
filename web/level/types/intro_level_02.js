'use strict';

const { Tiled_Data    } = require('../attributes/parse_tiled_data');
const { Trigger_Pad   } = require('../elements/pad');
const { Level_Factory } = require('./level_factory');

const level_data  = require('../data/intro_room_level_2.json');

class Items_Room_level_2 {
  constructor(player) {
    this.name     = 'intro';

    this.player   = player;
    this.elements = new Tiled_Data(level_data);

    this._set_elements();
  }

  _set_elements() {
    const {exit_pad} = this.elements;
    global.set_light_level(0.9);

    Level_Factory.generate(this.player, this.elements);

    exit_pad.forEach(data => {
      const pad  = new Trigger_Pad();
      pad.height = data.height;
      pad.width  = data.width;
      pad.anchor = 0;
      pad.set_position(data);
      pad.area.events.on('trigger', () => {
      });
    });

  }
}

module.exports = {
  Items_Room_level_2,
};
