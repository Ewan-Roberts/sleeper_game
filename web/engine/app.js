const { Application, settings } = require('pixi.js');
const { env } = require('../../config');
const { Viewport } = require('pixi-viewport');
const Cull = require('pixi-cull');

console.time();

const app = new Application({
  width           : global.window.innerWidth,
  height          : global.window.innerHeight,
  backgroundColor : env.background_color,
  roundPixels     : env.round_pixels,
  antialias       : env.anti_alias,
});

settings.ROUND_PIXELS               = env.round_pixels;
settings.RENDER_OPTIONS.roundPixels = env.round_pixels;
settings.RESOLUTION                 = env.resolution;
settings.TARGET_FPMS                = env.fps;

const {renderer} = app;

renderer.roundPixels            = env.round_pixels;
renderer.resolution             = env.resolution;
renderer.options.roundPixels    = env.round_pixels;
//app.ticker.speed = 1;

global.document.body.appendChild(app.view);

const viewport = new Viewport({
  screenWidth:  global.window.innerWidth,
  screenHeight: global.window.innerHeight,
  worldWidth:   global.window.innerWidth,
  worldHeight:  global.window.innerHeight,
});

app.stage.addChild(viewport);

require('./sound.js');
const {stage, ticker, screen} = app;

module.exports = {
  viewport,
  ticker,
  screen,
  renderer,
  stage,
};

