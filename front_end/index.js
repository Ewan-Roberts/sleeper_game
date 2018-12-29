'use strict';

const PIXI = require('pixi.js');
const pixiPackerParser = require('pixi-packer-parser');

//engine set up
const app = require('./engine/app');
const ticker = require('./engine/ticker');
const viewport = require('./engine/viewport');

require('./engine/pixi_containers');
require('pixi-tween');

global.is_development = true;

app.stage.addChild(viewport);

ticker.add(() => PIXI.tweenManager.update());

const loader = new PIXI.loaders.Loader();
loader.use(pixiPackerParser(PIXI));
loader.add('../../images/bedroom_EN_web.json');

loader.load(async function() {

  //await register_user();
  const { DevelopmentLevel } = require('./level/development/dev_level.js');
  const level_load = new DevelopmentLevel();
  //const development_room = require('./level/debug/debug_layout.js');
  //const debug = require('./level/debug/debug_layout.js');
  //debug.add_floor();
});

