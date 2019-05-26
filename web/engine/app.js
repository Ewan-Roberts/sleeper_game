'use strict';
const { settings, Application } = require('pixi.js');
const PIXI = require('pixi.js');

settings.ROUND_PIXELS = true;
PIXI.settings.ROUND_PIXELS = true;
settings.RENDER_OPTIONS.roundPixels = true;
//PIXI.settings.RESOLUTION = 0.5;
//PIXI.settings.TARGET_FPMS = 0.03;
//PIXI.settings.UPLOADS_PER_FRAME = 1;

const app = new Application({
  width           : global.window.innerWidth,
  height          : global.window.innerHeight,
  powerPreference : 'low-performance',
  backgroundColor : 0x000000,
  roundPixels     : true,
  forceFXAA       : true,
});

global.document.body.appendChild(app.view);

module.exports = app;

