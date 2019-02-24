
'use strict';
const PIXI = require('pixi.js');

require('pixi-layers');
require('pixi-shadows');

const app = require('./app');

const world = PIXI.shadows.init(app);
world.interactive = true;
world.updateLayersOrder = function () {
  world.children.sort(function(a,b) {
    a.zIndex = a.zIndex || 0;
    b.zIndex = b.zIndex || 0;
    return b.zIndex - a.zIndex;
  });
};

//const shadow = new PIXI.shadows.Shadow(900, 1);
//shadow.pointCount = 1;
//shadow.overlayLightLength = 200;
//shadow.intensity = 1;
//shadow.ambientLight = 1;
//shadow.position.set(450, 150);

////FOR TESTING make 0.5 for lighting
//PIXI.shadows.filter.ambientLight = 1;

//world.addChild(shadow);

module.exports = {
  world,
};






