'use strict';
const PIXI = require('pixi.js');

const { visuals  } = require('../engine/pixi_containers');
const { renderer }= require('../engine/app');

global.place_bunny = ({ x, y } /*light*/) => {
  const bunny = new PIXI.Sprite.fromFrame('bunny');
  bunny.position.set(x, y);
  bunny.anchor.set(0.5);
  bunny.width = 100;
  bunny.height = 100;

  visuals.addChild(bunny);
  return bunny;
};
global.env = 'prod';
global.dev = () => {
  renderer.backgroundColor = 0xd3d3d3;
  global.env = 'dev';
};


// AUTO-REFRESH WINDOW
// For dev auto refesh
// let blurred = false;
// global.window.onblur = function() { blurred = true; };
// global.window.onfocus = function() { blurred && (global.location.reload()); };
// 20/ 29;
