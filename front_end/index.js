'use strict';

const PIXI = require('pixi.js');
const pixi_packer_parser = require('pixi-packer-parser');

//require('./engine/login.js');
//engine set up
require('./engine/app');
require('./engine/ticker');
require('./engine/pixi_containers');

const loader = new PIXI.loaders.Loader();
loader.use(pixi_packer_parser(PIXI));
loader.add('../../images/bedroom_EN_web.json');

loader.load(async function() {
  const { DevelopmentLevel } = require('./level/development/dev_level.js');

  new DevelopmentLevel();

  require('./engine/inventory_manager');
});
