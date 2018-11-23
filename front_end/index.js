const PIXI = require('pixi.js');
const tween = require('pixi-tween');
const pixiPackerParser = require('pixi-packer-parser');

//engine set up 
const app = require('./engine/app');
const ticker = require('./engine/ticker');
const viewport = require('./engine/viewport');

ticker.add(() => PIXI.tweenManager.update())
global.document.body.appendChild(app.view);

global.is_development = true;

app.stage.addChild(viewport);

global.collisionItems = new PIXI.Container();
global.movableItems = new PIXI.Container();
global.doors = new PIXI.Container();

viewport.addChild(global.collisionItems, global.movableItems, global.doors);
const loader = new PIXI.loaders.Loader();
loader.use(pixiPackerParser(PIXI));
loader.add('../../images/bedroom_EN_web.json');
loader.load(() => {
  const debug = require('./level/debug/debug_layout.js');
  debug.add_floor();
  const pathfinding = require('./pathfinding/pathfind_util.js');
});

