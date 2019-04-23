'use strict';

const { critter_container } = require('../../engine/pixi_containers');

const { Tween     } = require('../../engine/tween');
const { Character } = require('../character_model');
const { Bird      } = require('../animations/bird');
const { Pathfind  } = require('../attributes/pathfind');

// this should extend a character type
class Crow extends Character{
  constructor() {
    super();
    this.name = 'crow';

    // dark brown
    this.add_component(new Bird(this));
    this.sprite.tint = 0x352925;
    this.sprite.play();
    this.add_component(new Tween(this.sprite));
    this.add_component(new Pathfind(this.sprite));

    critter_container.addChild(this.sprite);
  }
}

module.exports = {
  Crow,
};
