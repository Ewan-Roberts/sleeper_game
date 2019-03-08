'use strict';

const { Level       } = require('../level_model');
const { Background  } = require('../elements/background');
const { Hay         } = require('../elements/hay_bale');
const { Trigger_Pad } = require('../elements/pad');
const { Randomise   } = require('../attributes/randomise');

class Random_Room extends Level {
  constructor(player) {
    super();
    this.name        = 'animations_room';

    this.randomise   = new Randomise();
    this.randomise_2 = new Randomise();
    this.randomise_3 = new Randomise();
    this.randomise_4 = new Randomise();
    this.pad         = new Trigger_Pad();

    this.background  = new Background('grid_floor');
    this.hay_bale    = new Hay();
    this.player      = player;

  }

  set_elements(offset) {
    global.set_light_level(1);
    this.background.alpha = 0.2;

    this.background.set_position({x:1100+offset.x, y:500+offset.y});
    this.background.sprite.scale.x = 0.5;
    this.background.sprite.scale.y = 0.5;
    this.randomise.box(200);
    this.randomise.set_position({x:700+offset.x, y:250+offset.y});
    this.randomise.tint = 'green';
    this.randomise.random_items();

    this.randomise_2.box(300);
    this.randomise_2.set_position({x:1300+offset.x, y:300+offset.y});
    this.randomise_2.tint = 'red';
    this.randomise_2.random_items();

    this.randomise_3.box(300);
    this.randomise_3.set_position({x:1400+offset.x, y:700+offset.y});
    this.randomise_3.tint = 'white';
    this.randomise_3.random_items();

    this.randomise_4.height = 200;
    this.randomise_4.width = 400;
    this.randomise_4.set_position({x:800+offset.x, y:750+offset.y});
    this.randomise_4.tint = 'grey';
    this.randomise_4.rotate_items = false;
    this.randomise_4.populate_with_item('workbench');

    this.pad.set_position({x:1100+offset.x, y:840+offset.y});
    this.pad.tint   = 'red';
    this.pad.alpha  = 0.5;
    this.pad.width  = 400;
    this.pad.height = 100;
    this.pad.area.events.on('trigger', () => {
      this._destroy();

      const new_level = new Random_Room(this.player);
      new_level.set_elements({x:0,y:this.player.sprite.y});
    });
    global.set_light_level(1);
  }

  _destroy() {
    // this.background.destroy();
    this.pad.destroy();
  }
}

module.exports = {
  Random_Room,
};
