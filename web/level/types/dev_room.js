'use strict';

const { Level      } = require('../level_model');
const { Background } = require('../elements/background');
const { Camera     } = require('../../engine/camera');

class Dev_Room extends Level {
  constructor() {
    super();
    this.name       = 'dev_room';

    this.background = new Background('grid_floor');
    this.camera     = new Camera();

    this._set_elements();
  }

  _set_elements() {
    this.background.alpha = 0.5;
    this.background.set_position({x: 1100, y: 500});

    this.camera.set_center({ x: 1400, y: 500 });
  }
}

module.exports = {
  Dev_Room,
};
