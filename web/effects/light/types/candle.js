'use strict';

const PIXI = require('pixi.js');
const { visual_effects_container } = require('../../../engine/pixi_containers');
const { Light } = require('../light_model');

class Candle extends Light {
  constructor() {
    super();

    this.shadow.alpha = 0;
    this.shadow.pointCount = 1;
    this.shadow.range = 200;
    this.shadow.overlayLightLength = 200;
    this.shadow.intensity = 0.5;
    this.shadow.ambientLight = 0.5;

    PIXI.shadows.filter.ambientLight = 0.02;
  }

  add_candle() {
    const candle_sprite = PIXI.Sprite.fromFrame('small_candle');
    candle_sprite.anchor.set(0.5);
    candle_sprite.width = 20;
    candle_sprite.height = 20;
    candle_sprite.position.copy(this.shadow);

    visual_effects_container.addChild(candle_sprite);

    PIXI.shadows.filter.ambientLight = 0.13;
  }
}

module.exports = {
  Candle,
};
