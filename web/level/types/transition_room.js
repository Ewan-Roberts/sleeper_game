'use strict';

const { Level       } = require('../level_model');
const { Background  } = require('../elements/background');
const { Trigger_Pad } = require('../elements/pad');
const { Random_Room } = require('./random_room');

class Transition_Room extends Level {
  constructor(player) {
    super();
    this.name       = 'animations_room';
    this.background = new Background('grid_floor');
    this.player     = player;
    this.pad        = new Trigger_Pad();
  }

  set_elements(offset) {
    global.set_light_level(1);

    this.background.alpha = 0.2;
    this.background.sprite.scale.x = 0.5;
    this.background.sprite.scale.y = 0.5;
    this.background.set_position({x:1100+offset.x, y:500+offset.y});

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
  }

  _destroy() {
    this.pad.destroy();
  }
}

module.exports = {
  Transition_Room,
};










