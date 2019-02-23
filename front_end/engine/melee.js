'use strict';

/*
 * @params {Character} - attacker model
 * @params {Character} - target model
 */

function melee_attack(attacker, target) {
  console.log(attacker)
  const { damage } = attacker.inventory.melee_weapon;

  target.vitals.damage(damage);
}

module.exports = {
  melee_attack,
};
