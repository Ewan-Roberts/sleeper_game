'use strict';
const PIXI = require('pixi.js');
const { ticker }  = require('./app');
global.window.PIXI.default = PIXI;

require('pixi-tween');
require('pixi-keyboard');

// 60/30 for 30 fps
const fpsDelta = 60/55;

let elapsedTime = 0;
ticker.add(delta => {
  elapsedTime += delta;

  if(elapsedTime >= fpsDelta) {
    PIXI.tweenManager.update();
    PIXI.keyboardManager.update();
    elapsedTime = 0;
  }
});

