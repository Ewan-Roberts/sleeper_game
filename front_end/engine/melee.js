'use strict';

/*
 * @params {Character} - attacker model
 * @params {Character} - target model
 */

function melee_attack(attacker, target) {
  const attacker_damage = attacker.inventory.weapon_damage;

  target.vitals.damage(attacker_damage);
}

module.exports = {
  melee_attack,
};
