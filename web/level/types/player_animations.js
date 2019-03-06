'use strict';

const { Level      } = require('../level_model');
const { Background } = require('../attributes/background');
const { Camera     } = require('../../engine/camera');
const { NPC        } = require('../../character/types/npc');

class Animations_Room extends Level {
  constructor() {
    super();
    this.name           = 'animations_room';

    this.background     = new Background('grid_floor');
    this.camera         = new Camera();
    this.nothing_walking = new NPC();
    this.nothing_idle   = new NPC();
    this.candle_walking = new NPC();
    this.candle_idle    = new NPC();

    this._set_elements();
  }

  _set_elements() {
    global.set_light_level(1);

    this.background.alpha = 0.2;
    this.background.set_position({x: 1100, y: 500});

    this.camera.set_center({ x: 1400, y: 500 });

    this.nothing_walking.set_position({x: 800, y: 250});
    this.nothing_walking.animation.custom('nothing_walk');

    this.candle_walking.set_position({x: 800, y: 400});
    this.candle_walking.animation.custom('candle_walk');

    this.nothing_idle.set_position({x: 800, y: 600});
    this.nothing_idle.animation.custom('nothing_idle');

    this.candle_idle.set_position({x: 800, y: 750});
    this.candle_idle.animation.custom('candle_idle');
  }
}

module.exports = {
  Animations_Room,
};
