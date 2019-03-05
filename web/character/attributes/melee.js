'use strict';

const { melee_attack } = require('../../engine/melee');

class Melee {
  constructor({ inventory, animation }) {
    if(!inventory) throw new Error('This component needs an inventory');
    this.name      = 'melee';

    this.inventory = inventory;
    this.animation = animation;

    this.melee_weapon = inventory.melee_weapon;
  }

  equip() {
    this.inventory.equip_melee_weapon();

    this.animation.weapon = this.melee_weapon.animation_name;
  }

  attack(target) {
    this.equip();
    this.animation.attack();

    this.animation.face_point(target.sprite);

    melee_attack(this.melee_weapon, target);
  }
}

module.exports = {
  Melee,
};
