'use strict';

const PIXI = require('pixi.js');

const app = new PIXI.Application({
  width          : global.window.innerWidth,
  height         : global.window.innerHeight,
  antialias      : false,
  autoResize     : true,
  backgroundColor: 0x000000,
});

global.document.body.appendChild(app.view);

// For dev auto refesh
// let blurred = false;
// global.window.onblur = function() { blurred = true; };
// global.window.onfocus = function() { blurred && (global.location.reload()); };

module.exports = app;

