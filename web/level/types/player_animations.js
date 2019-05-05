'use strict';

const { Background } = require('../elements/background');
const { Camera     } = require('../../engine/camera');
const { NPC        } = require('../../character/types/npc');

class Animations_Room {
  constructor() {
    this.name            = 'animations_room';

    this.background      = new Background('grid_floor');
    this.camera          = new Camera();
    this.nothing_walking = new NPC();
    this.nothing_idle    = new NPC();

    this.candle_walking  = new NPC();
    this.candle_idle     = new NPC();

    this.bow_walking     = new NPC();
    this.bow_idle        = new NPC();
    this.bow_shoot       = new NPC();
    this._set_elements();
  }

  _set_elements() {
    global.set_light_level(1);

    this.background.alpha = 0.2;
    this.background.set_position({x: 1100, y: 500});

    this.camera.set_center({ x: 1400, y: 500 });

    this.nothing_walking.set_position({x: 800, y: 250});
    this.nothing_walking.animation.switch('nothing_walk');

    this.candle_walking.set_position({x: 800, y: 400});
    this.candle_walking.animation.switch('candle_walk');

    this.nothing_idle.set_position({x: 800, y: 600});
    this.nothing_idle.animation.switch('nothing_idle');

    this.candle_idle.set_position({x: 800, y: 750});
    this.candle_idle.animation.switch('candle_idle');

    this.bow_walking.animation.switch('bow_walk');
    this.bow_walking.animation.speed = 0.4;
    this.bow_walking.set_position({x: 1000, y: 750});

    this.bow_idle.animation.switch('bow_idle');
    this.bow_idle.animation.speed = 0.4;
    this.bow_idle.set_position({x: 1000, y: 600});

    this.bow_shoot.animation.switch('bow_shoot');
    this.bow_shoot.animation.speed = 0.4;
    this.bow_shoot.set_position({x: 1000, y: 450});
  }
}

module.exports = {
  Animations_Room,
};
