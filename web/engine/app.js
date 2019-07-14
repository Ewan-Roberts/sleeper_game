
const { Application, settings } = require('pixi.js');
const { env } = require('../../config');

console.time();
const app = new Application({
  width           : global.window.innerWidth,
  height          : global.window.innerHeight,
  backgroundColor : env.background_color,
  roundPixels     : env.round_pixels,
});

settings.ROUND_PIXELS               = env.round_pixels;
settings.RENDER_OPTIONS.roundPixels = env.round_pixels;
settings.RESOLUTION                 = env.resolution;
settings.TARGET_FPMS                = env.fps;
app.renderer.roundPixels            = env.round_pixels;
app.renderer.resolution             = env.resolution;
app.renderer.options.roundPixels    = env.round_pixels;
//app.ticker.speed = 1;

global.document.body.appendChild(app.view);

require('./sound.js');

module.exports = app;

