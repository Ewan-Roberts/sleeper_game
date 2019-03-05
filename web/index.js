'use strict';
const PIXI = require('pixi.js');

require('./engine/pixi_containers');
require('pixi-spine');
require('./engine/globals');

const { world } = require('./engine/shadows');

const { loader } = require('./engine/packer');
loader.add('../../images/bedroom_EN_web.json');
loader.add('dragon', 'images/Dragon.json');
loader.add('player_walk', 'images/player_walk.json');
loader.load(async function(loader, resources) {
  const dragon = new PIXI.spine.Spine(resources.dragon.spineData);
  dragon.height = 100;
  dragon.width = 100;
  dragon.x = 1000;
  dragon.y = 400;

  global.set_light_level(1);

  const player_walk = new PIXI.spine.Spine(resources.player_walk.spineData);
  player_walk.height = 70;
  player_walk.width = 55;
  player_walk.x = 1100;
  player_walk.y = 500;






  world.addChild(dragon, player_walk);

  dragon.state.setAnimation(0, 'walk', true);
  dragon.state.timeScale = 0.1;

  player_walk.state.setAnimation(0, 'walk', true);
  // player_walk.state.timeScale = 0.1;
  // ONLY FOR TESTING
  // if (dragon_animation.state.hasAnimation('walk')) {
  // }

  const { DevelopmentLevel } = require('./level/dev_level.js');

  new DevelopmentLevel();

  require('./view/view_inventory');
});
