const { Sprite, Texture, DEG_TO_RAD } = require('pixi.js');
const { pads            } = require('../../engine/pixi_containers');
const { Level_Factory   } = require('../types/level_factory');
const { env             } = require('../../../config');
const event = require('events');

class Trigger_Pad extends Sprite {
  constructor(data) {
    super(Texture.WHITE);
    this.id       = data.id;
    this.height   = data.height;
    this.width    = data.width;
    this.rotation = data.rotation * DEG_TO_RAD;
    this.alpha    = (env.visable_pads)?0.2:0;
    this.speed    = (env.dev)?25:data.speed;

    this.events   = new event();

    this.anchor.set(0);
    this.position.copy(data);

    const {level_name, spawn_id} = data;
    if(level_name) {
      this.events.once('trigger', () => {
        Level_Factory.create(level_name, spawn_id);
      });
    }

    pads.addChild(this);
  }

  on(name, callback) {
    this.tint  = 0xffff00;
    this.events.on(name, callback);
  }

  once(name, callback) {
    this.tint  = 0xffff00;
    this.events.once(name, () => {
      callback();
      this.destroy();
    });
  }
}

module.exports = {
  Trigger_Pad,
};
