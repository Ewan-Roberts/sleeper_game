'use strict';

require('pixi-tween');
const PIXI = require('pixi.js');
const app = require('./app');

app.ticker.add(() => PIXI.tweenManager.update());

module.exports = app.ticker;
