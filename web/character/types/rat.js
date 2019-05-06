'use strict';
const { enemys    } = require('../../engine/pixi_containers');

const { Character } = require('../character_model');
const { Rodent    } = require('../animations/rat');
const { Inventory } = require('../attributes/inventory');
const { Vitals    } = require('../attributes/vitals');
const { Lootable  } = require('../attributes/lootable');

//TODO: Animal isnt quite right, more neutral character
// the logic for it being an animal is in the parent ArcheType
class Animal extends Character {
  constructor() {
    super();
    this.name = 'rat';

    this.add_component(new Rodent(this));
    this.add_component(new Vitals(this));
    this.add_component(new Inventory());
    this.add_component(new Lootable(this));

    enemys.addChild(this.sprite);
  }
}

module.exports = {
  Animal,
};
