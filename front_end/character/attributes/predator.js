'use strict';

const { timer                         } = require('../../engine/ticker');
const { move_sprite_to_sprite_on_grid } = require('../../engine/pathfind.js');
const { distance_between_points       } = require('../../engine/math');

class Predator {
  constructor(entity) {
    this.name   = 'predator';
    this.type   = 'predator';
    this.entity = entity;
  }

  is_predator_to(prey) {
    const min_distance = 10;
    const max_distance = 700;
    const { 'sprite': prey_sprite     } = prey;
    const { 'sprite': predator_sprite } = this.entity;
    const { speed, damage             } = this.entity.inventory.equiped_weapon;

    const attack_timer  = timer.createTimer(speed);
    attack_timer.repeat = 10;
    attack_timer.on('repeat', () => {
      prey.vitals.damage(damage);

      if(!prey.vitals.alive){
        prey.animation.switch('dead');
        this.entity.sprite.stop();
      }
    }).start();

    const movement_timer  = timer.createTimer(1000);
    movement_timer.repeat = 5;
    movement_timer.on('repeat', () => {
      const distance_to_act = distance_between_points(predator_sprite, prey_sprite);

      if(distance_to_act < 200) {
        this.entity.animation.attack();

        attack_timer.start();
      } else {
        attack_timer.stop();
        this.entity.animation.walk();
      }

      if(
        distance_to_act < min_distance ||
        distance_to_act > max_distance ||
        !this.entity.vitals.alive
      ) {
        return;
      }

      move_sprite_to_sprite_on_grid(predator_sprite, prey_sprite);
    }).start();
  }
}

module.exports = {
  Predator,
};
