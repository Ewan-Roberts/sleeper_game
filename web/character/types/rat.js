'use strict';
const PIXI = require('pixi.js');

const { critter_container } = require('../../engine/pixi_containers');

const { Character } = require('../character_model');
const { Rodent    } = require('../animations/rat');

const { Inventory } = require('../attributes/inventory');
const { Vitals    } = require('../attributes/vitals');
const { Lootable  } = require('../attributes/lootable');
const { Pathfind  } = require('../attributes/pathfind');

class Animal extends Character {
  constructor() {
    super();
    this.name = 'rat';

    const texture = [PIXI.Texture.fromFrame('bunny')];
    this.sprite = new PIXI.extras.AnimatedSprite(texture);

    this.add_component(new Rodent(this.sprite));
    this.add_component(new Vitals(this));
    this.add_component(new Inventory());
    this.add_component(new Lootable(this));
    this.add_component(new Pathfind(this.sprite));

    critter_container.addChild(this.sprite);
  }
}

module.exports = {
  Animal,
};
