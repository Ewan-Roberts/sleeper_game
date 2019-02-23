'use strict';

const { shoot_arrow      } = require('../../engine/ranged');

class Range {
  constructor(entity) {
    this.name   = 'range';
    this.entity = entity;

    this.ranged_weapon = entity.inventory.ranged_weapon;
  }

  equip() {
    this.entity.inventory.equip_ranged_weapon();

    this.entity.animation.weapon = this.ranged_weapon.animation_name;
  }

  attack(target) {
    this.equip();
    this.entity.animation.ready_weapon();

    this.entity.face_sprite(target.sprite);

    shoot_arrow(this.entity, target);
  }
}

module.exports = {
  Range,
};
