'use strict';

const { melee_attack } = require('../../engine/melee');

class Melee {
  constructor(entity) {
    if(!entity.inventory) throw new Error('This component needs an inventory');
    this.name   = 'melee';
    this.entity = entity;

    this.melee_weapon = entity.inventory.melee_weapon;
  }

  equip() {
    this.entity.inventory.equip_melee_weapon();

    this.entity.animation.weapon = this.melee_weapon.animation_name;
  }

  attack(target) {
    this.equip();
    this.entity.animation.attack();

    this.entity.face_sprite(target.sprite);

    melee_attack(this.entity, target);
  }
}

module.exports = {
  Melee,
};
