const { Application } = require('pixi.js');
console.time();
const app = new Application({
  width           : global.window.innerWidth,
  height          : global.window.innerHeight,
  backgroundColor : 0xffffff,
  // forceFXAA       : true,
});

global.document.body.appendChild(app.view);

require('./sound.js');

module.exports = app;

