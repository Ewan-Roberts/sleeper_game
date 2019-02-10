'use strict';

const PIXI = require('pixi.js');

const app = new PIXI.Application({
  width          : global.window.innerWidth,
  height         : global.window.innerHeight,
  antialias      : false,
  autoResize     : true,
  backgroundColor: 0x2F4F4F,
});

const { viewport } = require('./viewport');

app.stage.addChild(viewport);

global.document.body.appendChild(app.view);

module.exports = app;
