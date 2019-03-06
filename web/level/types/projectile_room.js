'use strict';

const { Level      } = require('../level_model');
const { Background } = require('../attributes/background');
const { Hay        } = require('../attributes/hay_bale');

const { Camera     } = require('../../engine/camera');
const { Player     } = require('../../character/types/player');

class Projectile_Room extends Level {
  constructor() {
    super();
    this.name        = 'animations_room';

    this.background  = new Background('grid_floor');
    this.hay_bale    = new Hay();
    this.camera      = new Camera();
    this.player      = new Player();

    this._set_elements();
  }

  _set_elements() {
    global.set_light_level(1);

    this.background.alpha = 0.2;
    this.background.set_position({x: 1100, y: 500});

    this.camera.set_center({ x: 1400, y: 500 });

    this.player.set_position({x: 800, y: 500});
    this.player.inventory.arm_ranged('old_bow');

    this.hay_bale.set_position({x: 1300, y: 500});
    this.hay_bale.rotation = -1.5;
    this.hay_bale.alpha = 0.5;
  }
}

module.exports = {
  Projectile_Room,
};
