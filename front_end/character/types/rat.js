'use strict';

const { critter_container } = require('../../engine/pixi_containers');

const { Character } = require('../character_model');
const { Rodent    } = require('../animations/rat');
const { Inventory } = require('../attributes/inventory');
const { Vitals    } = require('../attributes/vitals');
const { Prey      } = require('../attributes/prey');
const { Lootable  } = require('../attributes/lootable');

class Animal extends Character {
  constructor() {
    super();
    this.name = 'rat';

    this.add_component(new Rodent(this.sprite));
    this.add_component(new Vitals(this));
    this.add_component(new Prey(this));
    this.add_component(new Inventory());
    this.add_component(new Lootable(this));

    critter_container.addChild(this.sprite);
  }
}

module.exports = {
  Animal,
};
