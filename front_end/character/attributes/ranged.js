'use strict';

const { shoot_arrow      } = require('../../engine/ranged');
const { View_Aiming_Line } = require('../../view/view_aiming_line');

class Range {
  constructor(entity) {
    this.name   = 'range';
    this.entity = entity;

    this.ranged_weapon = entity.inventory.ranged_weapon;
  }

  equip_weapon() {
    this.entity.inventory.equip_weapon_by_name(this.ranged_weapon.name);

    this.entity.animation.weapon = this.ranged_weapon.animation_name;
  }

  attack(target) {
    this.equip_weapon();
    this.entity.animation.ready_weapon();

    this.entity.face_sprite(target.sprite);

    View_Aiming_Line.add_between_sprites(target.sprite, this.entity.sprite);

    shoot_arrow(this.entity, target);
  }
}

module.exports = {
  Range,
};
