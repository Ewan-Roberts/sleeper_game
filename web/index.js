'use strict';

require('./engine/globals');
require('./engine/shadows');

const { loader } = require('./engine/packer');

loader.add('../../images/bedroom_EN_web.json');
loader.add('dragon', 'images/Dragon.json');
loader.add('player_walk', 'images/player_walk.json');

loader.load(() => {
  const { Level_Loader } = require('./level/dev_level.js');

  Level_Loader.boot();
});
