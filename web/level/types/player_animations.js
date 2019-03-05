
'use strict';

const { Level      } = require('../level_model');
const { Background } = require('../attributes/background');
const { Camera     } = require('../../engine/camera');
const { NPC        } = require('../../character/types/npc');

class Animations_Room extends Level {
  constructor() {
    super();
    this.name        = 'animations_room';

    this.background  = new Background('grid_floor');
    this.camera      = new Camera();
    this.walking     = new NPC();

    this._set_elements();
  }

  _set_elements() {

    global.set_light_level(1);

    this.background.alpha = 0.2;
    this.background.set_position({x: 1100, y: 500});

    this.camera.set_center({ x: 1400, y: 500 });

    this.walking.set_position({x: 800, y: 300});
    this.walking.sprite.scale.set(0.4);
    this.walking.animation.switch('walk');
  }
}

module.exports = {
  Animations_Room,
};
