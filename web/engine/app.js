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

module.exports = app;

