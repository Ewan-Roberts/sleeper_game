'use strict';

const { Level      } = require('../level_model');
const { Background } = require('../elements/background');

//This is a base template for new rooms
class Dev_Room extends Level {
  constructor(player) {
    super();
    this.name       = 'dev_room';

    this.player     = player;
    this.background = new Background('grid_floor');

    this._set_elements();
  }

  _set_elements() {
    global.set_light_level(1);

    this.background.alpha = 0.5;
    this.background.set_position({x: 1100, y: 500});
  }
}

module.exports = {
  Dev_Room,
};
