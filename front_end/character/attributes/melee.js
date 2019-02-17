'use strict';

const { melee_attack } = require('../../engine/melee');
const { radian       } = require('../../utils/math');

class Melee {
  constructor(entity) {
    this.name = 'melee';
    this.entity = entity;
    this.melee_weapon = entity.inventory.melee_weapon;
  }

  attack(target) {
    this.entity.inventory.equip_weapon_by_name(this.melee_weapon.name);

    this.entity.sprite.rotation = radian(target.sprite, this.entity.sprite);

    this.entity.animation.attack();

    melee_attack(this.entity, target);
  }
}

module.exports = {
  Melee,
};
