require('./utils/globals');

const { loader } = require('./engine/packer');
loader.add('../../images/bedroom_EN_web.json');
loader.add('../../images/work_EN_web.json');
loader.load(() => {
  console.log('33333333');
  const { Level_Loader } = require('./engine/boot_loader.js');
  Level_Loader.boot();
});



