'use strict';

const { enemys    } = require('../../engine/pixi_containers');

const { Character } = require('../character_model');
const { Human     } = require('../animations/human');
const { Inventory } = require('../attributes/inventory');
const { Vitals    } = require('../attributes/vitals');
const { Lootable  } = require('../attributes/lootable');
const { Pathfind  } = require('../attributes/pathfind');

class Enemy extends Character {
  constructor() {
    super();
    this.name = 'enemy';
    this.add_component(new Human(this));

    this.add_component(new Vitals(this));
    this.add_component(new Inventory());
    this.add_component(new Lootable(this));
    this.add_component(new Pathfind(this.sprite));

    enemys.addChild(this.sprite);
  }
}

module.exports = {
  Enemy,
};
