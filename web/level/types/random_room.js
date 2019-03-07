'use strict';

const { Level      } = require('../level_model');
const { Background } = require('../elements/background');
const { Hay        } = require('../elements/hay_bale');
const { Randomise  } = require('../attributes/randomise');

const { Camera     } = require('../../engine/camera');
const { Player     } = require('../../character/types/player');

class Random_Room extends Level {
  constructor() {
    super();
    this.name        = 'animations_room';

    this.randomise   = new Randomise();
    this.randomise_2 = new Randomise();
    this.randomise_3 = new Randomise();
    this.randomise_4 = new Randomise();

    this.background  = new Background('grid_floor');
    this.hay_bale    = new Hay();

    this.camera      = new Camera();
    this.player      = new Player();

    this._set_elements();
  }

  _set_elements() {
    global.set_light_level(1);
    this.background.alpha = 0.2;
    this.background.set_position({x:1100, y:500});
    this.camera.set_center({x:800, y:200});
    this.camera.set_position({x:800, y:200});
    this.player.set_position({x:800, y:500});
    this.player.inventory.arm_ranged('old_bow');
    this.player.vitals.speed = 10;

    this.randomise.box(200);
    this.randomise.set_position({x:700, y:250});
    this.randomise.tint = 'green';
    this.randomise.random_items();

    this.randomise_2.box(300);
    this.randomise_2.set_position({x:1300, y:300});
    this.randomise_2.tint = 'red';
    this.randomise_2.random_items();

    this.randomise_3.box(300);
    this.randomise_3.set_position({x:1400, y:700});
    this.randomise_3.tint = 'white';
    this.randomise_3.random_items();

    this.randomise_4.height = 200;
    this.randomise_4.width = 400;
    this.randomise_4.set_position({x:800, y:750});
    this.randomise_4.tint = 'grey';
    this.randomise_4.rotate_items = false;
    this.randomise_4.populate_with_item('workbench');
  }
}

module.exports = {
  Random_Room,
};
