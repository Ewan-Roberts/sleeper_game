/* eslint-disable*/
'use strict';

const { Level_Factory } = require('../level/types/level_factory');

const { Tween  } = require('./tween');
require('./sound.js');
class Level_Loader {
  static boot() {
    if(global.env === 'dev') {
      const PIXI = require('pixi.js');
      PIXI.settings.ROUND_PIXELS = true;
      PIXI.settings.RENDER_OPTIONS.roundPixels = true;
      PIXI.settings.RESOLUTION = 0.5;
      PIXI.settings.TARGET_FPMS = 0.04;
      PIXI.settings.UPLOADS_PER_FRAME = 1;
    }
    const start_level = (global.env === 'dev')?'transition':'start';

    Level_Factory.create(start_level);
  }
}


module.exports = {
  Level_Loader,
};
