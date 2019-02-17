'use strict';

const { shoot_arrow      } = require('../../engine/ranged');
const { View_Aiming_Line } = require('../../view/view_aiming_line');
const { radian           } = require('../../utils/math');

class Range {
  constructor(entity) {
    this.name   = 'range';
    this.entity = entity;
    this.ranged_weapon = entity.inventory.ranged_weapon;
  }

  attack(target) {
    this.entity.inventory.equip_weapon_by_name(this.ranged_weapon.name);

    this.entity.animation.ready_weapon();

    this.entity.sprite.rotation = radian(target.sprite, this.entity.sprite);

    View_Aiming_Line.add_between_sprites(target.sprite, this.entity.sprite);

    shoot_arrow(this.entity, target);
  }
}

module.exports = {
  Range,
};
