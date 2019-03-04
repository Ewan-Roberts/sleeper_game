'use strict';
const PIXI = require('pixi.js');

require('./engine/pixi_containers');
require('pixi-spine');
require('./engine/globals');

const { world } = require('./engine/shadows');


const { loader } = require('./engine/packer');
loader.add('../../images/bedroom_EN_web.json');
loader.add('spineCharacter', 'images/Dragon.json');
loader.load(async function(loader, resources) {
  const animation = new PIXI.spine.Spine(resources.spineCharacter.spineData);
  animation.height = 100;
  animation.width = 100;
  animation.x = 1000;
  animation.y = 400;
  world.addChild(animation);

  const animation1 = new PIXI.spine.Spine(animation.spineData);
  if (animation1.state.hasAnimation('walk')) {
    // run forever, little boy!
    animation.state.setAnimation(0, 'walk', true);
    // dont run too fast
    animation.state.timeScale = 0.1;
  }

  // ONLY FOR TESTING

  const { DevelopmentLevel } = require('./level/dev_level.js');

  new DevelopmentLevel();

  require('./view/view_inventory');
});
