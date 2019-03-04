'use strict';

require('./engine/pixi_containers');
require('./engine/shadows');

const { loader } = require('./engine/packer');
loader.add('../../images/bedroom_EN_web.json');

loader.load(async function() {
  // ONLY FOR TESTING
  require('./engine/globals');

  const { DevelopmentLevel } = require('./level/dev_level.js');

  new DevelopmentLevel();

  require('./view/view_inventory');
});
