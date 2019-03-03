'use strict';

const PIXI = require('pixi.js');
const { visual_effects_container } = require('../../../engine/pixi_containers');
const { Light } = require('../light_model');
const { Flicker } = require('../attributes/flicker');

class Candle extends Light {
  constructor() {
    super();

    this.add_component(new Flicker(this.shadow));
    this.shadow.alpha = 0.2;
    this.shadow.pointCount = 1;
    this.shadow.range = 150;
    this.shadow.overlayLightLength = 200;
    this.shadow.intensity = 0.4;
    this.shadow.ambientLight = 0.5;
  }

  // This overwrites the base class version
  set_position({x, y}) {
    this.shadow.position.set(x, y);

    this._add_candle();

    if(this.candle_sprite) {
      this.candle_sprite.position.copy(this.shadow);
    }
  }

  _add_candle() {
    this.candle_sprite = PIXI.Sprite.fromFrame('small_candle');
    this.candle_sprite.anchor.set(0.5);
    this.candle_sprite.width = 20;
    this.candle_sprite.height = 20;
    this.candle_sprite.position.copy(this.shadow);

    visual_effects_container.addChild(this.candle_sprite);
  }

  start_flickering() {
    const candle_wick = new Candle();

    candle_wick.set_position(this.candle_sprite);
    candle_wick.shadow.range = 15;
    candle_wick.shadow.alpha = 1;
    candle_wick.shadow.intensity = 1;
    this.flicker.start();
    candle_wick.flicker.start();
  }

}

module.exports = {
  Candle,
};
