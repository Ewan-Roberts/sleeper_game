const PIXI = require('pixi.js');
global.window.PIXI.default = PIXI;
const { ticker }  = require('./app');

require('pixi-keyboard');

// 60/30 for 30 fps
const fps_delta = (global.env === 'dev')?2:1;

let elapsedTime = 0;
ticker.add(delta => {
  elapsedTime += delta;

  if(elapsedTime >= fps_delta) {
    PIXI.tweenManager.update();
    PIXI.keyboardManager.update();
    elapsedTime = 0;
  }
});

