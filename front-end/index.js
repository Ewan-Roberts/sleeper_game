const PIXI = require('pixi.js'),
      io = require('socket.io-client'),
      Viewport = require('pixi-viewport'),
      tween = require('pixi-tween'),
      Layer = require('pixi-layers'),
      pixiPackerParser = require("pixi-packer-parser");

global.socket = io.connect();
global.socket.on("thing", res => console.log(res))

// add the viewport to the stage
global.app = new PIXI.Application({ 
    width: window.innerWidth,   // default: 800
    height: window.innerHeight, // default: 600
    antialias: false,           // default: false
    autoResize: true,
    backgroundColor: 0xC1C1C1
});
 
document.body.appendChild(global.app.view);

global.viewport = new Viewport({
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    worldWidth: window.innerWidth,
    worldHeight: window.innerHeight
});

global.app.stage.addChild(viewport);
global.viewport.drag().decelerate();

global.collisionItems = new PIXI.Container();
global.movableItems = new PIXI.Container();
global.doors = new PIXI.Container();
global.layer = new PIXI.display.Layer();
global.layer.group.enableSort = true;

global.viewport.addChild(global.collisionItems,global.movableItems,global.doors)
global.loader = new PIXI.loaders.Loader();
global.loader.use(pixiPackerParser(PIXI));
global.loader.add("../../images/bedroom_EN_web.json");
global.loader.load((loader,res) => { 

  const debug = require("./level/debug/debug_layout.js");
  debug.add_floor()

});

app.ticker.add(delta => PIXI.tweenManager.update());
