'use strict';

const { timer                         } = require('../../engine/ticker');
const { move_sprite_to_sprite_on_grid } = require('../../engine/pathfind.js');
const { distance_between_points       } = require('../../utils/math');

class Predator {
  constructor(entity) {
    this.name   = 'predator';
    this.type   = 'predator';
    this.entity = entity;
  }

  is_predator_to(prey) {
    const predator          = this.entity;
    const { speed, damage } = predator.inventory.equipped_weapon;
    const distance = distance_between_points(predator.sprite, prey.sprite);

    const attack_timer  = timer.createTimer(speed);
    attack_timer.repeat = 10;
    attack_timer.on('repeat', () => {
      if(!prey.vitals.alive){
        prey.animation.switch('dead');
        predator.sprite.stop();
      }

      prey.vitals.damage(damage);
    }).start();

    const movement_timer  = timer.createTimer(1000);
    movement_timer.repeat = 5;
    movement_timer.on('repeat', () => {
      if(distance < 200) {
        predator.animation.attack();

        attack_timer.start();
      } else {
        predator.animation.walk();

        attack_timer.stop();
      }

      const min = 10;
      const max = 700;
      if(distance < min||distance > max||!predator.vitals.alive) return;

      move_sprite_to_sprite_on_grid(predator.sprite, prey.sprite);
    }).start();
  }
}

module.exports = {
  Predator,
};
