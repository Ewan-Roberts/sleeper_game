

require('../level/elements');
const { Level_Factory } = require('../level/types/level_factory');

require('./tween');

global.dev();

class Level_Loader {
  static boot() {
    if(global.env === 'dev') {
      console.log('in DEV');
      const PIXI = require('pixi.js');
      PIXI.settings.ROUND_PIXELS = true;
      PIXI.settings.RENDER_OPTIONS.roundPixels = true;
      PIXI.settings.RESOLUTION = 0.01;
      PIXI.settings.TARGET_FPMS = 0.05;
      PIXI.settings.UPLOADS_PER_FRAME = 1;
    }
    const start_level = (global.env === 'dev')?'transition':'start';

    Level_Factory.create(start_level);
  }
}


module.exports = {
  Level_Loader,
};
