'use strict';
const { collision_container } = require('../../engine/pixi_containers');

const { Item   } = require('./item_model');
const { Vitals } = require('../../character/attributes/vitals');

class Hay extends Item {
  constructor() {
    super('bale_square');

    this.add_component(new Vitals(this));
    this.sprite.width  = 150;
    this.sprite.height = 120;

    collision_container.addChild(this.sprite);
  }

  on_hit(amount) {
    if(this.vitals.status === 'dead') {
      this.sprite.destroy();
      return;
    }

    this.vitals.damage(amount);
  }
}

module.exports = {
  Hay,
};
