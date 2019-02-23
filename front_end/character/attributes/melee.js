'use strict';

const { melee_attack } = require('../../engine/melee');

class Melee {
  constructor(entity) {
    this.name   = 'melee';
    this.entity = entity;

    this.melee_weapon = entity.inventory.melee_weapon;
  }

  equip_weapon() {
    this.entity.inventory.equip_weapon_by_name(this.melee_weapon.name);

    this.entity.animation.weapon = this.melee_weapon.animation_name;
  }

  attack(target) {
    this.equip_weapon();
    this.entity.animation.attack();

    this.entity.face_sprite(target.sprite);

    melee_attack(this.entity, target);
  }
}

module.exports = {
  Melee,
};
