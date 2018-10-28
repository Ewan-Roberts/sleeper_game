const PIXI = require('pixi.js');
const io = require('socket.io-client');
const Viewport = require('pixi-viewport');
const tween = require('pixi-tween');
const Layer = require('pixi-layers');
const pixiPackerParser = require('pixi-packer-parser');
const debug = require('./level/debug/debug_layout.js');


global.socket = io.connect();
// global.socket.on('thing', (res) => {
//   console.log(res);
// });

// add the viewport to the stage
global.app = new PIXI.Application({
  width: global.window.innerWidth,
  height: global.window.innerHeight,
  antialias: false,
  autoResize: true,
  backgroundColor: 0xC1C1C1,
});

global.document.body.appendChild(global.app.view);

global.viewport = new Viewport({
  screenWidth: global.window.innerWidth,
  screenHeight: global.window.innerHeight,
  worldWidth: global.window.innerWidth,
  worldHeight: global.window.innerHeight,
});

global.app.stage.addChild(global.viewport);
global.viewport.drag().decelerate();

global.collisionItems = new PIXI.Container();
global.movableItems = new PIXI.Container();
global.doors = new PIXI.Container();
global.layer = new PIXI.display.Layer();
global.layer.group.enableSort = true;

global.viewport.addChild(global.collisionItems, global.movableItems, global.doors);
global.loader = new PIXI.loaders.Loader();
global.loader.use(pixiPackerParser(PIXI));
global.loader.add('../../images/bedroom_EN_web.json');
global.loader.load(() => {
  debug.add_floor();
  const pathfinding = require('./pathfinding/pathfind_util.js');
});

global.app.ticker.add(() => PIXI.tweenManager.update());
