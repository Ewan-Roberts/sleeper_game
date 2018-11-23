

const Viewport = require('pixi-viewport');

const viewport = new Viewport({
  screenWidth:  global.window.innerWidth,
  screenHeight: global.window.innerHeight,
  worldWidth:   global.window.innerWidth,
  worldHeight:  global.window.innerHeight,
});

viewport.drag().decelerate();

module.exports = viewport;
