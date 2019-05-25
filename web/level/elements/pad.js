'use strict';
const { Sprite, Texture } = require('pixi.js');
const { pads } = require('../../engine/pixi_containers');
const { Level_Factory } = require('../types/level_factory');
const event = require('events');

class Trigger_Pad {
  constructor(data, player) {
    this.id = data.id;
    this.sprite = new Sprite(Texture.WHITE);
    this.sprite.height = data.height;
    this.sprite.width  = data.width;
    this.sprite.alpha  = 0.3;
    this.sprite.anchor.set(0);
    this.sprite.position.set(data.x, data.y);
    this.sprite.rotation = data.rotation * (Math.PI/180);

    if(data.properties && data.properties.level_name) {
      this.sprite.events = new event({once: true});
      this.sprite.events.once('trigger', () => {
        Level_Factory.create(data.properties, player);
      });
    }

    pads.addChild(this.sprite);
  }

  destroy() {
    pads.removeChild(this.sprite);
  }
}

module.exports = {
  Trigger_Pad,
};
