/* eslint-disable*/
'use strict';

const { Level_Factory } = require('../level/types/level_factory');

class Level_Loader {
  static boot() {
    Level_Factory.create({
      properties: {level_name: 'transition'}
    })
  }
}

module.exports = {
  Level_Loader,
};
