
'use strict';

const PIXI = require('pixi.js');

require('pixi-layers');
require('pixi-shadows');

const app = require('./app');

//FOR TESTING
const shadow = new PIXI.shadows.Shadow(900, 1);
shadow.pointCount = 1;
shadow.overlayLightLength = 1000;
shadow.intensity = 3;
shadow.ambientLight= 1;
shadow.position.set(450, 150);

const world = PIXI.shadows.init(app);
PIXI.shadows.filter.ambientLight = 1;

world.interactive = true;
world.updateLayersOrder = function () {
  world.children.sort(function(a,b) {
    a.zIndex = a.zIndex || 0;
    b.zIndex = b.zIndex || 0;
    return b.zIndex - a.zIndex;
  });
};

world.addChild(shadow);

module.exports = {
  world,
  shadow,
};






