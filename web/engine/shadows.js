'use strict';
const PIXI = require('pixi.js');
require('pixi-layers');
require('pixi-shadows');

const app = require('./app');
const world = PIXI.shadows.init(app);
world.name = 'world';
world.updateLayersOrder = function () {
  world.children.sort(function(a,b) {
    a.zIndex = a.zIndex || 0;
    b.zIndex = b.zIndex || 0;
    return b.zIndex - a.zIndex;
  });
};

module.exports = {
  world,
};






