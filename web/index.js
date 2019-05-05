'use strict';
require('./utils/globals');

const { loader } = require('./engine/packer');
loader.add('../../images/bedroom_EN_web.json');
loader.on('progress', (p) => console.log('progress', p.progress));
loader.load(() => {
  const { Level_Loader } = require('./engine/boot_loader.js');


  Level_Loader.boot();
});



