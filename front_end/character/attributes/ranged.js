'use strict';

const { shoot_arrow      } = require('../../engine/ranged');
const { View_Aiming_Line } = require('../../view/view_aiming_line');

const { radian } = require('../../utils/math');

class Range {
  constructor(weapon) {
    this.name   = 'range';
    this.weapon = weapon;
  }

  attack_from_to(attacker, target) {

    attacker.inventory.equip_weapon_by_name('old_bow');
    attacker.animation.weapon = attacker.inventory.equipped_weapon.animation_name;
    attacker.animation.ready_weapon();

    attacker.sprite.rotation = radian(target.sprite, attacker.sprite);

    View_Aiming_Line.add_between_sprites(target.sprite, attacker.sprite);

    setTimeout(() => shoot_arrow(attacker, target),1000);
  }
}

module.exports = {
  Range,
};
