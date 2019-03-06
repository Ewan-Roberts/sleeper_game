'use strict';

const { shoot_arrow } = require('../../engine/ranged');
const { Aiming_Line } = require('../../effects/aiming_line');

class Range {
  constructor({ inventory, animation, sprite }) {
    this.name      = 'range';
    this.inventory = inventory;
    this.animation = animation;
    this.sprite    = sprite;
    this.aiming    = new Aiming_Line();
  }

  equip() {
    this.inventory.equip_ranged_weapon();

    this.animation.weapon = this.inventory.ranged_weapon.animation_name;
  }

  attack(target) {
    this.equip();
    this.animation.ready_weapon();
    this.animation.face_point(target.sprite);

    const ranged_weapon = this.inventory.ranged_weapon;
    const origin = this.sprite;
    shoot_arrow(ranged_weapon.speed, ranged_weapon.damage, origin, target.sprite);
  }

  _add_line(sprite) {
    this.line.add_between_sprites(this.sprite, sprite);
  }
}

module.exports = {
  Range,
};
