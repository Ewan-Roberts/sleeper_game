'use strict';

/*
 * @params {Character} - attacker model
 * @params {Character} - target model
 */

function melee_attack(melee_weapon, target) {
  const { damage } = melee_weapon;

  target.vitals.damage(damage);
}

module.exports = {
  melee_attack,
};
