'use strict';

const { Level      } = require('../level_model');
const { Background } = require('../elements/background');
const { Hay        } = require('../elements/hay_bale');
const { Wall       } = require('../elements/wall');
const { Chest      } = require('../elements/chest');
const { Candle     } = require('../../light/types/candle');
const { Backpack  } = require('../elements/back_pack');
const { Workbench } = require('../elements/workbench');
const { Item      } = require('../elements/item_model');

class Items_Room extends Level {
  constructor(player) {
    super();
    this.name        = 'animations_room';

    this.player      = player;
    this.background  = new Background('grid_floor');
    this.hay_bale    = new Hay();
    this.chest       = new Chest();
    this.candle      = new Candle();
    this.backpack    = new Backpack();
    this.workbench   = new Workbench();
    this.wall        = new Wall();

    this._set_elements();
  }

  _set_elements() {
    global.set_light_level(1);
    let iterate_x = 300;
    const iterate_y = 300;

    this.background.alpha = 0.5;
    this.background.set_position({x: 1100, y: 500});

    const workbench = new Item('workbench');
    workbench.width = 150;
    workbench.height = 100;
    workbench.add();
    workbench.set_position({x: iterate_x, y: iterate_y });
    iterate_x += 200;

    const dirty_matress = new Item('dirty_matress');
    dirty_matress.width  = 200;
    dirty_matress.height = 150;
    dirty_matress.add();
    dirty_matress.set_position({x: iterate_x, y: iterate_y });
    iterate_x += 200;

    const chair = new Item('chair');
    chair.width  = 100;
    chair.height = 100;
    chair.add();
    chair.set_position({x: iterate_x, y: iterate_y });
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
