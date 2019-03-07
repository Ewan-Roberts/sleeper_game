'use strict';

const { Level      } = require('../level_model');
const { Background } = require('../elements/background');
const { Hay        } = require('../elements/hay_bale');

const { Camera     } = require('../../engine/camera');
const { Player     } = require('../../character/types/player');
const { Archer     } = require('../../character/archetypes/archer');

class Archer_Room extends Level {
  constructor() {
    super();
    this.name        = 'animations_room';

    this.background  = new Background('grid_floor');
    this.archer      = new Archer();
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

    this.hay_bale.set_position({x: 1300, y: 400});
    this.hay_bale.rotation = -1.5;
    this.hay_bale.alpha = 0.5;

    this.archer.set_position({x: 1300, y: 600});

    this.archer.enemy(this.player);
    this.archer.logic_start();

    this.archer.inventory.arm_ranged('weak_bow');
  }
}

module.exports = {
  Archer_Room,
};
