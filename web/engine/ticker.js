'use strict';
const PIXI = require('pixi.js');
const app  = require('./app');

//Needed for utils
global.window.PIXI.default = PIXI;

require('pixi-tween');
require('pixi-keyboard');

//app.ticker.deltaTime = 2;
const fpsDelta = 60/30;
let elapsedTime = 0;

app.ticker.add(delta => {
  elapsedTime += delta;

  if(elapsedTime >= fpsDelta) {
    PIXI.tweenManager.update();
    PIXI.keyboardManager.update();
    elapsedTime = 0;
  }
});

