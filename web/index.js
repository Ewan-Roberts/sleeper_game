'use strict';

const PIXI = require('pixi.js');
const pixi_packer_parser = require('pixi-packer-parser');

//require('./engine/login.js');
//engine set up
require('./engine/pixi_containers');

const loader = new PIXI.loaders.Loader();
loader.use(pixi_packer_parser(PIXI));
loader.add('../../images/bedroom_EN_web.json');

loader.load(async function() {
  require('./engine/shadows');

  const { DevelopmentLevel } = require('./level/dev_level.js');

  new DevelopmentLevel();

  require('./view/view_inventory');

  const { update_build_version } = require('./view/build_info');

  await update_build_version();
});
