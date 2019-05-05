'use strict';
const { Sprite, Texture } = require('pixi.js');
const { pad_container } = require('../../engine/pixi_containers');
const { Level_Factory } = require('../types/level_factory');
const event = require('events');

class Trigger_Pad {
  constructor(data, player) {
    this.area = new Sprite(Texture.WHITE);
    this.area.height = data.height;
    this.area.width  = data.width;
    this.area.alpha  = 0.3;
    this.area.anchor.set(0);
    this.area.position.set(data.x, data.y);
    this.area.events = new event({once: true});
    this.area.rotation = data.rotation * (Math.PI/180);

    if(data.properties && data.properties.level_name) {
      this.area.events.once('trigger', () => {
        Level_Factory.create(data.properties, player);
      });
    }

    pad_container.addChild(this.area);
  }

  destroy() {
    pad_container.removeChild(this.area);
  }
}

module.exports = {
  Trigger_Pad,
};
