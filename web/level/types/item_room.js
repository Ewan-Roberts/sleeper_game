'use strict';

const { Level           } = require('../level_model');
const { Background      } = require('../elements/background');
const { Wall            } = require('../elements/wall');
const { Candle          } = require('../../light/types/candle');
const { Element_Factory } = require('../elements/elements_factory');

class Items_Room extends Level {
  constructor(player) {
    super();
    this.name        = 'animations_room';

    this.player      = player;
    this.background  = new Background('grid_floor');
    this.candle      = new Candle();
    this.wall        = new Wall();

    this.hay_bale    = Element_Factory.generate('hay');
    this.chair       = Element_Factory.generate('chair');
    this.matress     = Element_Factory.generate('mattress');
    this.chest       = Element_Factory.generate('chest');
    this.backpack    = Element_Factory.generate('backpack');
    this.workbench   = Element_Factory.generate('workbench');

    this._set_elements();
  }

  _set_elements() {
    global.set_light_level(1);
    let iterate_x = 300;
    const iterate_y = 300;

    this.background.alpha = 0.5;
    this.background.set_position({x: 1100, y: 500});

    this.workbench.set_position({x: iterate_x, y: iterate_y });
    iterate_x += 200;

    this.matress.set_position({x: iterate_x, y: iterate_y });
    iterate_x += 200;

    this.chair.set_position({x: iterate_x, y: iterate_y });
    iterate_x += 200;

    this.hay_bale.set_position({x: iterate_x, y: iterate_y });
    this.hay_bale.rotation = -2.5;
    iterate_x += 200;

    this.chest.set_position({x: iterate_x, y: iterate_y });
    iterate_x += 200;
    this.backpack.set_position({x: iterate_x, y: iterate_y });
    iterate_x += 200;
    this.workbench.set_position({x: iterate_x, y: iterate_y });
    iterate_x += 300;
    this.wall.set_position({x: iterate_x, y: iterate_y });
  }
}

module.exports = {
  Items_Room,
};
