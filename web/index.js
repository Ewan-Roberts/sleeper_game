'use strict';

require('./utils/globals');

const { loader } = require('./engine/packer');
loader.add('../../images/bedroom_EN_web.json');
loader.add('../../images/work_EN_web.json');
loader.load((ass) => {
  const { Level_Loader } = require('./engine/boot_loader.js');
  console.log(ass);
  // TODO: For testing, space out CPU spikes
  setTimeout(()=> Level_Loader.boot(), 100);
});



