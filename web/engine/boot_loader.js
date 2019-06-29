/* eslint-disable*/
'use strict';

const { Level_Factory } = require('../level/types/level_factory');

const { Tween  } = require('./tween');
require('./sound.js');
class Level_Loader {
  static boot() {
    Level_Factory.create('transition');
  }
}

module.exports = {
  Level_Loader,
};
