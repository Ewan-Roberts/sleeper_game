'use strict';
const { settings, Application } = require('pixi.js');
console.time();
const app = new Application({
  width           : global.window.innerWidth,
  height          : global.window.innerHeight,
  backgroundColor : 0xffffff,
  roundPixels     : true,
  forceFXAA       : true,
});

global.document.body.appendChild(app.view);

module.exports = app;

