'use strict';
const PIXI = require('pixi.js');

const { world } = require('../engine/shadows');
const { timer } = require('../engine/ticker');

class torch {
  constructor() {
    this.shadow = new PIXI.shadows.Shadow(500);
    this.shadow.pointCount = 23;
    this.shadow.overlayLightLength = 200;
    this.shadow.intensity = 0.9;
    this.shadow.ambientLight = 0.2;

    // PIXI.shadows.filter.ambientLight = 0.2;
    world.addChild(this.shadow);
  }

  set_position(x, y) {
    this.shadow.position.set(x, y);
  }
}

class candle {
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

  flicker() {
    const flicker_timer  = timer.createTimer(200);
    flicker_timer.repeat = 25;

    flicker_timer.on('repeat', () => {
      this.sprite.intensity += ( Math.random()/16 - 0.03) ;
    });

    flicker_timer.on('stop', function() {
      this.remove();
    });

    flicker_timer.on('end', function() {
      this.remove();
    });

    flicker_timer.start();
  }
}


module.exports = {
  torch,
  candle,
  lantern,
  dev_light,
};
