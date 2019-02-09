'use strict';

const PIXI          = require('pixi.js');
const { viewport  } = require('../../engine/viewport');
const { construct } = require('../../engine/constructor');

const { Character } = require('../character_model');
const { Inventory } = require('../attributes/inventory');
const { Vitals    } = require('../attributes/vitals');
const { Prey      } = require('../attributes/prey');

const critter_container = viewport.getChildByName('critter_container');
const rat_animations = require('./animations/rat');

class Rat extends construct(Character) {
  constructor() {
    super();
    this.name = 'rat';

    this.sprite = new PIXI.extras.AnimatedSprite(rat_animations.move);
    this.sprite.animations = rat_animations;
    this.sprite.anchor.set(0.5);
    this.sprite.name = 'rat';
    this.sprite.height *= 2;
    this.sprite.width *= 2;

    this.addComponent(new Vitals());
    this.addComponent(new Prey(this));
    this.addComponent(new Inventory());

    this.inventory.populate_random_inventory();

    critter_container.addChild(this.sprite);
  }

  lootable_on_death() {
    this.sprite.kill = () => {

      this.sprite.stop();
      this.sprite.interactive = true;
      this.sprite.buttonMode = true;
      this.sprite.texture = this.sprite.animations.dead;
      this.vitals.status = 'dead';

      const get_tween = PIXI.tweenManager.getTweensForTarget(this.sprite);
      if(get_tween[0]) {
        get_tween[0].stop();
      }

      this.lootable();
    };
  }

  lootable() {
    this.sprite.click = () => {
      this.set_inventory_position(this.sprite);
    };
  }
}

module.exports = {
  Rat,
};
