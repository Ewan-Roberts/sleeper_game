const { Sprite, Texture } = require('pixi.js');
const { Level_Factory } = require('../types/level_factory');
const { pads } = require('../../engine/pixi_containers');

const event = require('events');

class Click_Pad extends Sprite {
  constructor(data) {
    super(Texture.WHITE);
    this.id       = data.id;
    this.height   = data.height;
    this.width    = data.width;
    this.rotation = data.rotation * (Math.PI/180);
    this.alpha    = data.properties && data.properties.alpha || 0.3;
    this.events   = new event({once: true});
    this.interactive = true;
    this.buttonMode  = true;

    this.anchor.set(0);
    this.position.copy(data);

    if(data.properties && data.properties.level_name) {
      const {level_name} = data.properties;
      this.events.once('trigger', () => Level_Factory.create(level_name));
    }

    pads.addChild(this);
  }

  destroy() {
    pads.removeChild(this);
  }
}

module.exports = {
  Click_Pad,
};
