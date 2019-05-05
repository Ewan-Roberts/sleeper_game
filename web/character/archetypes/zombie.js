'use strict';

const { enemy_container } = require('../../engine/pixi_containers');

const { Tween     } = require('../../engine/tween');
const { Character } = require('../character_model');
const { Zombie    } = require('../animations/zombie');
const { Pathfind  } = require('../attributes/pathfind');

// this should extend a character type
class Lurcher extends Character{
  constructor() {
    super();
    this.name = 'crow';

    // dark brown
    this.add_component(new Zombie(this));
    this.sprite.tint = 0x352925;
    this.sprite.play();
    this.add_component(new Tween(this.sprite));
    this.add_component(new Pathfind(this.sprite));

    enemy_container.addChild(this.sprite);
  }
}

module.exports = {
  Lurcher,
};
