'use strict';

function melee_attack(melee_weapon, target) {
  const { damage } = melee_weapon;
  console.log(target);
  target.vitals.damage(damage);
}

module.exports = {
  melee_attack,
};
