const { Level_Factory } = require('../level/types/level_factory');
const { Player        } = require('../character/archetypes/player');
const { players       } = require('./pixi_containers');
const { env           } = require('../../config');

class Level_Loader {
  static boot() {
    const player = new Player();
    players.addChild(player);
    const { level_on_load } = env;

    Level_Factory.create(level_on_load, player);
  }
}

module.exports = {
  Level_Loader,
};
