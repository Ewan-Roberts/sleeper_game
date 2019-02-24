'use strict';

const { shoot_arrow      } = require('../../engine/ranged');
const { View_Aiming_Line } = require('../../view/view_aiming_line');

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

  attack(target, accuracy) {
    this.equip();
    this.entity.animation.ready_weapon();
    this.entity.face_point(target.sprite);

    shoot_arrow(this.entity, target, accuracy);
  }

  _add_line(sprite) {
    View_Aiming_Line.add_between_sprites(this.entity.sprite, sprite);
  }
}

module.exports = {
  Range,
};
