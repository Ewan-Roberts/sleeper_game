'use strict';

const { Level       } = require('../level_model');
const { Background  } = require('../elements/background');
const { Trigger_Pad } = require('../elements/pad');
const { Random_Room } = require('./random_room');

const { world       } = require('../../engine/shadows');
const { Camera      } = require('../../engine/camera');
const { Player      } = require('../../character/types/player');

class Transition_Room extends Level {
  constructor() {
    super();
    this.name        = 'animations_room';
    this.background  = new Background('grid_floor');
    this.camera      = new Camera();
    this.player      = new Player();
    this.pad         = new Trigger_Pad();

    this._set_elements();
  }

  _set_elements() {
    global.set_light_level(1);
    this.background.alpha = 0.2;
    this.background.set_position({x:1100, y:500});
    // this.camera.set_center({x:1400, y:500});
    this.player.set_position({x:800, y:500});
    this.player.inventory.arm_ranged('old_bow');

    this.player.keyboard.move.on('event', () => {
      this.camera.set_center(this.player.sprite);
      const bunny = global.place_bunny({x: this.player.sprite.x, y: this.player.sprite.y});
      bunny.width = 8;
      bunny.height = 8;
    });

    this.pad.set_position({x:1100, y:840});
    this.pad.tint  = 'red';
    this.pad.alpha = 0.5;
    this.pad.width  = 400;
    this.pad.height = 100;
    this.pad.area.events.on('trigger', () => {
      this._destroy();

      new Random_Room();
    });
  }

  _destroy() {
    this.background.destroy();
    this.player.destroy();
    this.pad.destroy();
    this.camera.reset();
    // world.removeChildren();
  }
}

module.exports = {
  Transition_Room,
};










