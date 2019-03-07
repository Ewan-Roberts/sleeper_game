'use strict';

const { Level       } = require('../level_model');
const { Background  } = require('../elements/background');
const { Trigger_Pad } = require('../elements/pad');
const { Random_Room } = require('./random_room');

class Transition_Room extends Level {
  constructor(player) {
    super();
    this.name        = 'animations_room';
    this.background  = new Background('grid_floor');
    this.player      = player;
    this.pad         = new Trigger_Pad();

    this._set_elements();
  }

  _set_elements() {
    global.set_light_level(1);

    this.background.alpha = 0.2;
    this.background.set_position({x:1100, y:500});
    this.player.inventory.arm_ranged('old_bow');

    this.pad.set_position({x:1100, y:840});
    this.pad.tint  = 'red';
    this.pad.alpha = 0.5;
    this.pad.width  = 400;
    this.pad.height = 100;
    this.pad.area.events.on('trigger', () => {
      this._destroy();

      new Random_Room(this.player);
    });
  }

  _destroy() {
    this.background.destroy();
    this.pad.destroy();
  }
}

module.exports = {
  Transition_Room,
};










