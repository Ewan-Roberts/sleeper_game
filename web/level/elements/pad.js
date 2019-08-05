const { pads            } = require('../../engine/pixi_containers');
const { Level_Factory   } = require('../types/level_factory');
const { env             } = require('../../../config');
const { Element         } = require('./model');
const event = require('events');

class Trigger_Pad extends Element {
  constructor(data) {
    super({
      ...data,
      image_name: 'black_dot',
      alpha: env.visable_pads?0.4:0,
    });
    this.events = new event();
    this.speed = 30;
    if(data.speed) {
      this.speed    = 2;
    } else {
      this.speed    = (env.dev)?25:4;
    }

    this.anchor.set(0);

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
      //this.destroy();
    });
  }
}

module.exports = {
  Trigger_Pad,
};
