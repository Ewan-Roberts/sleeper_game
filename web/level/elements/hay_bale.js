'use strict';

const { collision_container } = require('../../engine/pixi_containers');

const event        = require('events');
const { Item   } = require('./item_model');
const { Vitals } = require('../../character/attributes/vitals');
const { Blood  } = require('../../view/types/blood');

class Hay extends Item {
  constructor() {
    super('bale_square');

    this.sprite.width  = 150;
    this.sprite.height = 120;
    this.sprite.events = new event();

    this.blood = new Blood();

    this.add_component(new Vitals(this));

    this.sprite.events.on('damage', damage => this.on_hit(damage));

    collision_container.addChild(this.sprite);
  }

  on_hit(amount) {
    if(this.vitals.status === 'dead') {
      this.blood.add_at(this.sprite);

      this.sprite.destroy();
      return;
    }

    this.vitals.damage(amount);
  }
}

module.exports = {
  Hay,
};