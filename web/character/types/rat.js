'use strict';
const { enemys    } = require('../../engine/pixi_containers');
const { Character } = require('../character_model');
const { Zombie    } = require('../animations/zombie');
const { Inventory } = require('../attributes/inventory');
const { Vitals    } = require('../attributes/vitals');

//TODO: Animal isnt quite right, more neutral character
// the logic for it being an animal is in the parent ArcheType
class Animal extends Character {
  constructor() {
    super();
    this.name = 'rat';

    this.add_component(new Zombie(this));
    this.add_component(new Vitals(this));
    this.add_component(new Inventory());
    this.sprite.play();

    enemys.addChild(this.sprite);
  }
}

module.exports = {
  Animal,
};
