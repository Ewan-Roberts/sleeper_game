'use strict';

require('./utils/globals');

const { loader } = require('./engine/packer');
loader.add('../../images/bedroom_EN_web.json');
loader.add('TestMap1', '../../tiled_room.json');
loader.load((res) => {
  const { Level_Loader } = require('./engine/boot_loader.js');

  
  Level_Loader.boot();
});



