'use strict';
const PIXI = require('pixi.js');
const sleep = time => new Promise(resolve => setTimeout(resolve, time));

const { visual_effects_container } = require('../engine/pixi_containers');
const { world } = require('../engine/shadows');
const { timer } = require('../engine/ticker');
const { Track } = require('../engine/sound');

class torch {
  constructor() {
    this.shadow = new PIXI.shadows.Shadow(500);
    this.shadow.pointCount = 23;
    this.shadow.overlayLightLength = 200;
    this.shadow.intensity = 0.9;
    this.shadow.ambientLight = 0.2;

    world.addChild(this.shadow);
  }

  set_position(x, y) {
    this.shadow.position.set(x, y);
  }
}

class lighter {
  constructor() {
    this.shadow = new PIXI.shadows.Shadow(500);
    this.shadow.pointCount = 1;
    this.shadow.range = 200;
    this.shadow.overlayLightLength = 200;
    this.shadow.intensity = 0.5;
    this.shadow.ambientLight = 0.5;
    this.sound = new Track('lighter.wav');
    this.sound.volume = 0.03;

    PIXI.shadows.filter.ambientLight = 0.02;
  }

  async _strike() {
    this.shadow.intensity = 0;
    this.sound.play();

    await sleep(300);
    this.shadow.intensity = 0.5;
    this.shadow.range = 110;
    PIXI.shadows.filter.ambientLight = 0.12;

    await sleep(40);
    this.shadow.alpha = 0;
    PIXI.shadows.filter.ambientLight = 0;

    await sleep(1100);
    this.shadow.alpha = 1;
    this.shadow.intensity = 0.4;
    this.shadow.range = 140;
    PIXI.shadows.filter.ambientLight = 0.09;

    await sleep(30);
    this.shadow.alpha = 0;
    PIXI.shadows.filter.ambientLight = 0;

    await sleep(1000);
    this.shadow.alpha = 1;
    this.shadow.intensity = 0.6;
    this.shadow.range = 120;

    await sleep(40);
    this.shadow.destroy();
  }

  async wait(time) {
    await sleep(time);

    world.addChild(this.shadow);

    this._strike();
  }

  set_position(x, y) {
    this.shadow.position.set(x, y);
  }
}


class candle {
  constructor() {
    this.shadow = new PIXI.shadows.Shadow(500, 100);
    this.shadow.pointCount = 1;
    this.shadow.range = 80;
    this.shadow.overlayLightLength = 50;
    this.shadow.intensity = 0.4;
    this.shadow.ambientLight = 0.2;

    world.addChild(this.shadow);
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

  set_position(x, y) {
    this.shadow.position.set(x, y);
  }
}


class lantern {
  constructor() {
    this.shadow = new PIXI.shadows.Shadow(500, 100);
    this.shadow.pointCount = 23;
    this.shadow.overlayLightLength = 200;
    this.shadow.intensity = 0.9;
    this.shadow.ambientLight = 0.2;
    world.addChild(this.shadow);
  }

  set_position(x, y) {
    this.shadow.position.set(x, y);
  }
}

class dev_light {
  constructor() {
    this.sprite = new PIXI.shadows.Shadow(500, 0);
    this.sprite.pointCount = 1;
    // this.sprite.overlayLightLength = 200;
    // this.sprite.intensity = 1;
    // this.sprite.ambientLight = 1;

    // PIXI.shadows.filter.ambientLight = 0.2;
    world.addChild(this.sprite);
  }

  set_position(x, y) {
    this.sprite.position.set(x, y);
  }

  remove() {
    world.removeChild(this.sprite);
  }

  flicker() {
    const flicker_timer  = timer.createTimer(200);
    flicker_timer.repeat = 25;

    flicker_timer.on('repeat', () => {
      this.sprite.intensity += ( Math.random()/16 - 0.03) ;
    });

    flicker_timer.on('end', function() {
      this.remove();
    });

    flicker_timer.start();
  }
}


module.exports = {
  torch,
  lighter,
  lantern,
  dev_light,
  candle,
};
