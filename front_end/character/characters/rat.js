'use strict';

const PIXI = require('pixi.js');
const viewport = require('../../engine/viewport');
const { construct } = require('../../engine/constructor');

const { Character } = require('../character_model');
const { Inventory } = require('../attributes/inventory');
const { Vitals    } = require('../attributes/vitals');
const { Prey      } = require('../attributes/prey');

const critter_container = viewport.getChildByName('critter_container');
const rat_animations = require('../animations/rat');

class Rat extends construct(Character, Vitals, Prey, Inventory) {
  constructor() {
    super();
    this.sprite = new PIXI.extras.AnimatedSprite(rat_animations.move);
    this.sprite.animations = rat_animations;
    this.sprite.anchor.set(0.5);
    this.sprite.name = 'rat';
    this.sprite.height *= 2;
    this.sprite.width *= 2;

    critter_container.addChild(this.sprite);
  }
}

module.exports = {
  Rat,
};
