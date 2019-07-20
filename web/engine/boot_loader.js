require('./tween');
const { Level_Factory } = require('../level/types/level_factory');
const { env           } = require('../../config');

class Level_Loader {
  static boot() {
    const { level_on_load } = env;

    Level_Factory.create(level_on_load);
  }
}

module.exports = {
  Level_Loader,
};
