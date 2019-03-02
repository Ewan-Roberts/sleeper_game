'use strict';

const PIXI = require('pixi.js');
const { visual_effects_container } = require('../../../engine/pixi_containers');
const { Light } = require('../light_model');
const { Flicker } = require('../attributes/flicker');

class Candle extends Light {
  constructor() {
    super();

    this.add_component(new Flicker(this.shadow));
    this.shadow.alpha = 0;
    this.shadow.pointCount = 1;
    this.shadow.range = 200;
    this.shadow.overlayLightLength = 200;
    this.shadow.intensity = 0.5;
    this.shadow.ambientLight = 0.5;
  }

  //TODO this shouldnt be here
  add_candle() {
    const candle_sprite = PIXI.Sprite.fromFrame('small_candle');
    candle_sprite.anchor.set(0.5);
    candle_sprite.width = 20;
    candle_sprite.height = 20;
    candle_sprite.position.copy(this.shadow);

    visual_effects_container.addChild(candle_sprite);
  }

  with_flickering() {
    const candle_wick = new Candle();

    candle_wick.set_position({ x: 1040, y: 400 });
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
