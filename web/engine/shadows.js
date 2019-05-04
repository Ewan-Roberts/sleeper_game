'use strict';
const PIXI = require('pixi.js');

//TODO move these the vendor folder and make a loader
require('pixi-layers');
require('pixi-shadows');

const app = require('./app');

const world = PIXI.shadows.init(app);
world.updateLayersOrder = function () {
  world.children.sort(function(a,b) {
    a.zIndex = a.zIndex || 0;
    b.zIndex = b.zIndex || 0;
    return b.zIndex - a.zIndex;
  });
};

console.log(world);


module.exports = {
  world,
};






