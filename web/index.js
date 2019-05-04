'use strict';
const PIXI = require('pixi.js');

require('./utils/globals');

const { loader } = require('./engine/packer');
loader.add('../../images/bedroom_EN_web.json');
loader.load(() => {
  const { Level_Loader } = require('./engine/boot_loader.js');


  Level_Loader.boot();
});



