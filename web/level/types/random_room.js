'use strict';

const { Level      } = require('../level_model');
const { Background } = require('../elements/background');
const { Hay        } = require('../elements/hay_bale');
const { Randomise  } = require('../attributes/randomise');

class Random_Room extends Level {
  constructor(player) {
    super();
    this.name        = 'animations_room';

    this.randomise   = new Randomise();
    this.randomise_2 = new Randomise();
    this.randomise_3 = new Randomise();
    this.randomise_4 = new Randomise();

    this.background  = new Background('grid_floor');
    this.hay_bale    = new Hay();
    this.player     = player;

    this._set_elements();
  }

  _set_elements() {
    global.set_light_level(1);
    this.background.alpha = 0.2;

    const buffer_y = this.player.sprite.y;

    this.background.set_position({x:1100, y:500+buffer_y});
    this.randomise.box(200);
    this.randomise.set_position({x:700, y:250+buffer_y});
    this.randomise.tint = 'green';
    this.randomise.random_items();

    this.randomise_2.box(300);
    this.randomise_2.set_position({x:1300, y:300+buffer_y});
    this.randomise_2.tint = 'red';
    this.randomise_2.random_items();

    this.randomise_3.box(300);
    this.randomise_3.set_position({x:1400, y:700+buffer_y});
    this.randomise_3.tint = 'white';
    this.randomise_3.random_items();

    this.randomise_4.height = 200;
    this.randomise_4.width = 400;
    this.randomise_4.set_position({x:800, y:750+buffer_y});
    this.randomise_4.tint = 'grey';
    this.randomise_4.rotate_items = false;
    this.randomise_4.populate_with_item('workbench');
  }
}

module.exports = {
  Random_Room,
};
