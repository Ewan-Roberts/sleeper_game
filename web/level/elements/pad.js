const { Sprite, Texture, DEG_TO_RAD } = require('pixi.js');
const { pads            } = require('../../engine/pixi_containers');
const { Level_Factory   } = require('../types/level_factory');
const event = require('events');

class Trigger_Pad extends Sprite {
  constructor(data, player) {
    super(Texture.WHITE);
    this.id       = data.id;
    this.height   = data.height;
    this.width    = data.width;
    this.rotation = data.rotation * DEG_TO_RAD;
    this.alpha    = (global.env === 'dev')?0.2:0;
    this.events   = new event();
    if(global.env === 'dev') {
      this.speed = 25;
    } else {
      this.speed = data.properties && data.properties.speed;
    }

    this.anchor.set(0);
    this.position.copy(data);

    if(data.properties && data.properties.level_name) {
      const {level_name} = data.properties;
      this.events.once('trigger', () => {
        player.destroy();
        Level_Factory.create(level_name);
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
