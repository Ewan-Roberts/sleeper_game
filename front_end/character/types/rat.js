'use strict';

const PIXI = require('pixi.js');

const { critter_container } = require('../../engine/pixi_containers');

const { Character } = require('../character_model');
const { Rodent    } = require('./animations/rat');
const { Inventory } = require('../attributes/inventory');
const { Vitals    } = require('../attributes/vitals');
const { Prey      } = require('../attributes/prey');

class Rat extends Character {
  constructor() {
    super();
    this.name = 'rat';
    const texture = [PIXI.Texture.fromFrame('bunny')];
    this.sprite = new PIXI.extras.AnimatedSprite(texture);

    this.add_component(new Rodent(this.sprite));
    this.add_component(new Vitals());
    this.add_component(new Prey(this));
    this.add_component(new Inventory());
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
