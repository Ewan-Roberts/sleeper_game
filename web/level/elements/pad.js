'use strict';
const { Sprite, Texture } = require('pixi.js');
const { pads } = require('../../engine/pixi_containers');
const { Level_Factory } = require('../types/level_factory');
const event = require('events');

const default_alpha = (global.env === 'dev')?0.1:0;

class Trigger_Pad extends Sprite {
  constructor(data, player) {
    super(Texture.WHITE);
    this.id       = data.id;
    this.height   = data.height;
    this.width    = data.width;
    this.rotation = data.rotation * (Math.PI/180);
    this.alpha    = data.properties && data.properties.alpha || default_alpha;
    this.anchor.set(0);
    this.position.copy(data);
    this.events = new event({once: true});

    if(data.properties && data.properties.level_name) {
      this.events.once('trigger', () => {
        Level_Factory.create(data, player);
      });
    }

    pads.addChild(this);
  }

  once(name, callback) {
    this.tint  = 0xffff00;
    this.alpha = (global.env === 'dev')?0.2:0;
    this.events.once(name, () => {
      callback();
      this.destroy();
    });
  }
}

module.exports = {
  Trigger_Pad,
};
