'use strict';

const { melee_attack } = require('../../engine/melee');

class Melee {
  constructor(weapon) {
    this.name = 'melee';

    this.weapon = weapon;
  }

  attack_from_to(attacker, target) {
    attacker.inventory.equip_weapon_by_name(this.weapon);
    attacker.animation.weapon = attacker.inventory.equipped_weapon.animation_name;
    attacker.animation.attack();

    melee_attack(attacker, target);
  }
}

module.exports = {
  Melee,
};
