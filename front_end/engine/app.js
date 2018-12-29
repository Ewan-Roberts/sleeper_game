'use strict';

const PIXI = require('pixi.js');

const app = new PIXI.Application({
  width: global.window.innerWidth,
  height: global.window.innerHeight,
  antialias: false,
  autoResize: true,
  backgroundColor: 0x2F4F4F, //0xC1C1C1
});

global.document.body.appendChild(app.view);

module.exports = app;
