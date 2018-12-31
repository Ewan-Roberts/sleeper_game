'use strict';

const Viewport = require('pixi-viewport');

const viewport = new Viewport({
  screenWidth:  global.window.innerWidth,
  screenHeight: global.window.innerHeight,
  worldWidth:   global.window.innerWidth,
  worldHeight:  global.window.innerHeight,
});

viewport.zIndex_layer = {
  background: 1,
  far: 3,
  medium: 6,
  close: 9,
  very_close: 12,
};

module.exports = viewport;
