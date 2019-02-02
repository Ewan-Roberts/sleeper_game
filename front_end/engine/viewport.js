'use strict';

const Viewport = require('pixi-viewport');

const viewport = new Viewport({
  screenWidth:  global.window.innerWidth,
  screenHeight: global.window.innerHeight,
  worldWidth:   global.window.innerWidth,
  worldHeight:  global.window.innerHeight,
});

viewport.updateLayersOrder = function () {
  viewport.children.sort(function(a,b) {
    a.zIndex = a.zIndex || 0;
    b.zIndex = b.zIndex || 0;
    return b.zIndex - a.zIndex;
  });
};

// always focus the window on load
// this helps with testing
global.window.focus();

module.exports = {
  viewport,
};

