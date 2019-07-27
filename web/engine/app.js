const { env      } = require('../../config');
const { Viewport } = require('pixi-viewport');
const PIXI = require('pixi.js');
const { Application, settings } = PIXI;

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

const { renderer, stage, ticker, screen, view } = app;

// 60/30 for 30 fps
const fps_delta = env.dev?2:1;

let elapsedTime = 0;
ticker.add(delta => {
  elapsedTime += delta;
  if(elapsedTime >= fps_delta) {
    PIXI.tweenManager.update();
    PIXI.keyboardManager.update();
    elapsedTime = 0;
  }
});

renderer.roundPixels         = env.round_pixels;
renderer.resolution          = env.resolution;
renderer.options.roundPixels = env.round_pixels;

global.document.body.appendChild(view);

const viewport = new Viewport({
  screenWidth:  global.window.innerWidth,
  screenHeight: global.window.innerHeight,
  worldWidth:   global.window.innerWidth,
  worldHeight:  global.window.innerHeight,
});
viewport.name = 'world';

viewport.updateLayersOrder = function () {
  viewport.children.sort(function(a,b) {
    a.zIndex = a.zIndex || 0;
    b.zIndex = b.zIndex || 0;
    return b.zIndex - a.zIndex;
  });
};

stage.addChild(viewport);

// Load project libraries
require('pixi-keyboard');
require('pixi-sound');
require('./pixi_containers');
require('./tween');
require('./sound.js');
require('pixi-tween');

module.exports = {
  viewport,
  ticker,
  screen,
  renderer,
  stage,
};

