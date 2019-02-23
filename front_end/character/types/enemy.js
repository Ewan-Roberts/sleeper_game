'use strict';

const { enemy_container } = require('../../engine/pixi_containers');

const { Character  } = require('../character_model');
const { Human      } = require('../animations/character');

const { Vitals     } = require('../attributes/vitals');
const { Lootable   } = require('../attributes/lootable');
const { Raycasting } = require('../attributes/raycasting');
const { Pathfind   } = require('../attributes/pathfind');

class Enemy extends Character {
  constructor() {
    super();
    this.name = 'enemy';
    this.sprite.name = 'enemy';

    this.add_component(new Human(this.sprite));
    this.add_component(new Lootable(this));
    this.add_component(new Vitals(this));
    this.add_component(new Raycasting(this.sprite));
    this.add_component(new Pathfind(this.sprite));

    enemy_container.addChild(this.sprite);
  }
}

module.exports = {
  Enemy,
};
