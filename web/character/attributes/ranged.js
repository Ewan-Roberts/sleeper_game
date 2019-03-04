'use strict';

const { shoot_arrow } = require('../../engine/ranged');
const { Aiming_Line } = require('../../effects/aiming_line');

class Range {
  constructor({ inventory, animation, util, sprite }) {
    this.name      = 'range';
    this.inventory = inventory;
    this.animation = animation;
    this.util      = util;
    this.sprite    = sprite;
    this.aiming    = new Aiming_Line();

    this.ranged_weapon = inventory.ranged_weapon;
  }

  equip() {
    this.inventory.equip_ranged_weapon();

    this.animation.weapon = this.ranged_weapon.animation_name;
  }

  attack(target) {
    this.equip();
    this.animation.ready_weapon();
    this.util.face_point(target.sprite);
    const ranged_weapon = this.ranged_weapon;
    const sprite = this.sprite;
    shoot_arrow({ ranged_weapon, sprite }, target);
  }

  _add_line(sprite) {
    this.line.add_between_sprites(this.sprite, sprite);
  }
}

module.exports = {
  Range,
};
