'use strict';

const PIXI = require('pixi.js');
global.window.PIXI = PIXI;
global.window.PIXI.default = PIXI;

require('pixi-tween');
require('pixi-timer');
const app = require('./app');

const timer = PIXI.timerManager;

app.ticker.add(() => {
  PIXI.timerManager.update();
  PIXI.tweenManager.update();
});

module.exports = {
  ticker: app.ticker,
  timer,
};
