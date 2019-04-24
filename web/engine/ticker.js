'use strict';
const PIXI = require('pixi.js');
const app  = require('./app');

//Needed for utils
global.window.PIXI = PIXI;
global.window.PIXI.default = PIXI;

require('pixi-tween');
require('pixi-keyboard');

app.ticker.add(() => {
  PIXI.tweenManager.update();
  PIXI.keyboardManager.update();
});

