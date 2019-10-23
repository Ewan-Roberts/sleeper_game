const { World } = require('../../engine/pixi_containers');
const { Level_Factory } = require('../types/level_factory');
const { env           } = require('../../../config');
const { Element       } = require('./model');
const { Text          } = require('pixi.js');
const event = require('events');

class Trigger_Pad extends Element {
  constructor(data) {
    super({
      ...data,
      'image_name': 'black_dot',
      'alpha'     : env.visable_pads ? 0.4 : 0,
    });
    this.events = new event();
    this.speed  = 30;

    // TODO look at the player speed as a number and the pad
    // that you walk onlo timesing the player speed by a modifier
    // player speed is for example 30 then on a slow bit you times by 0.5
    // pretend its by 0.5
    // dumpy data
    data.speed = 0.5;
    if(data.speed) {
      this.speed_modifier = data.speed;
    }

    if(data.speed) {
      this.speed = 2;
    } else {
      this.speed = (env.dev) ? 25 : 4;
    }

    this.anchor.set(0);

    const { level_name, spawn_id } = data;
    if(level_name) {
      this.events.once('trigger', () => {
        Level_Factory.create(level_name, spawn_id);
      });
    }

    World.add_to('pad', this);
  }

  set text(value) {
    const pad_text = new Text(value, { 'fontSize': 100 });
    this.addChild(pad_text);
  }

  on(name, callback) {
    this.tint = 0xffff00;

    this.events.on(name, callback);
  }

  once(name, callback) {
    this.tint  = 0xffff00;
    this.events.once(name, () => callback());
  }
}

module.exports = {
  Trigger_Pad,
};
