'use strict';

const PIXI = require('pixi.js');
const pixiPackerParser = require('pixi-packer-parser');

//engine set up
require('./engine/app');
require('./engine/ticker');
require('./engine/pixi_containers');

const loader = new PIXI.loaders.Loader();
loader.use(pixiPackerParser(PIXI));
loader.add('../../images/bedroom_EN_web.json');

loader.load(async function() {

  const { DevelopmentLevel } = require('./level/development/dev_level.js');

  new DevelopmentLevel();

});

