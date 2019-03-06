'use strict';

require('./engine/globals');

const { loader } = require('./engine/packer');

loader.add('../../images/bedroom_EN_web.json');
loader.add('dragon', 'images/Dragon.json');
loader.add('player', 'images/player.json');
loader.load(() => {
  const { Level_Loader } = require('./level/boot_loader.js');
  Level_Loader.boot();
});
