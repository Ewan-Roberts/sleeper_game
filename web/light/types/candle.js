'use strict';
const PIXI = require('pixi.js');

const { visual_effects_container } = require('../../engine/pixi_containers');
const { Light                    } = require('../light_model');
const { Flicker                  } = require('../attributes/flicker');

class Candle extends Light {
  constructor() {
    super();
    this.name = 'candle';

    this.add_component(new Flicker(this.shadow));
    this.sprite = PIXI.Sprite.fromFrame('small_candle');
    this.sprite.anchor.set(0.5);
    this.sprite.width  = 20;
    this.sprite.height = 20;

    this.shadow.alpha      = 0.2;
    this.shadow.pointCount = 1;
    this.shadow.range      = 350;
    this.shadow.intensity  = 0.5;
    visual_effects_container.addChild(this.sprite, this.shadow);

    // this.start_flickering();
  }

  // This overwrites the base class version
  set_position({x, y}) {
    this.shadow.position.set(x, y);

    if(this.sprite) {
      this.sprite.position.copy(this.shadow);
    }
  }

  start_flickering() {
    const candle_wick = new Candle();

    candle_wick.set_position(this.sprite);
    candle_wick.shadow.range = 15;
    candle_wick.shadow.alpha = 1;
    candle_wick.shadow.intensity = 1;
    candle_wick.flicker.start();

    this.flicker.start();
  }
}

module.exports = {
  Candle,
};
