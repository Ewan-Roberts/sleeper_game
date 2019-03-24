'use strict';

const { Level      } = require('../level_model');
const { Background } = require('../elements/background');

const { Element_Factory } = require('../elements/elements_factory');

class Projectile_Room extends Level {
  constructor(player) {
    super();
    this.name       = 'animations_room';

    this.background = new Background('grid_floor');
    this.hay_bale   = Element_Factory.generate('hay');
    this.hay_bale_2 = Element_Factory.generate('hay');
    this.player     = player;

    this._set_elements();
  }

  _set_elements() {
    global.set_light_level(1);

    this.background.alpha = 0.2;
    this.background.set_position({x: 1100, y: 500});

    this.player.set_position({x: 800, y: 500});
    this.player.inventory.arm_ranged('old_bow');

    this.hay_bale.set_position({x: 1300, y: 500});
    this.hay_bale.rotation = -1.5;
    this.hay_bale.alpha = 0.5;

    this.hay_bale_2.set_position({x: 1100, y: 300});
    this.hay_bale_2.rotation = -2.5;
    this.hay_bale_2.alpha = 0.5;
  }
}

module.exports = {
  Projectile_Room,
};
