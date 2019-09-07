const PIXI = require('pixi.js');
const { Application, settings } = PIXI;
const { env      } = require('../../config');
const { Viewport } = require('pixi-viewport');


const {
  'innerWidth':  window_width,
  'innerHeight': window_height,
} = global.window;

console.time();
const {
  renderer,
  stage,
  ticker,
  screen,
  view,
} = new Application({
  width:           window_width,
  height:          window_height,
  backgroundColor: env.background_color,
  roundPixels:     env.round_pixels,
  antialias:       env.anti_alias,
});

settings.ROUND_PIXELS               = env.round_pixels;
settings.RESOLUTION                 = env.resolution;
settings.TARGET_FPMS                = env.fps;
renderer.roundPixels                = env.round_pixels;
renderer.resolution                 = env.resolution;
renderer.options.roundPixels        = env.round_pixels;

const viewport = new Viewport();
viewport.updateLayersOrder = function () {
  viewport.children.sort(function(a,b) {
    a.zIndex = a.zIndex || 0;
    b.zIndex = b.zIndex || 0;
    return b.zIndex - a.zIndex;
  });
};
viewport.name = 'world';
stage.addChild(viewport);

// 60/30 for 30 fps
const fps_delta = env.dev?2:1;
let elapsed_time = 0;
ticker.add(delta => {
  elapsed_time += delta;
  if(elapsed_time >= fps_delta) {
    PIXI.tweenManager.update();
    PIXI.keyboardManager.update();
    elapsed_time = 0;
  }
});

global.document.body.appendChild(view);

// Load project libraries
require('pixi-keyboard');
require('pixi-sound');
require('pixi-tween');
require('./sound.js');
require('./pixi_containers');

module.exports = {
  viewport,
  ticker,
  screen,
  renderer,
  stage,
};

