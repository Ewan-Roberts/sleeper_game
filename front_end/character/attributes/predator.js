'use strict';

const { timer } = require('../../engine/ticker');

const { move_sprite_to_sprite_on_grid } = require('../../engine/pathfind.js');
const { distance_between_points } = require('../../engine/math');
const min_pathfind_distance = 10;
const max_pathfind_distance = 700;

class Predator {
  constructor() {
    this.type = 'predator';
  }

  is_predator_to(prey) {
    const { 'sprite': prey_sprite     } = prey;
    const { 'sprite': predator_sprite } = this;
    const { speed, damage             } = this.equiped_weapon;

    const attack_timer = timer.createTimer(speed);// based on the weapon speed
    attack_timer.loop = true;
    attack_timer.on('repeat', function() {
      if(!prey.alive){
        prey.animation_switch('dead');
        this.stop();
        return;
      }

      prey.damage(damage);
    });

    const movement_timer = timer.createTimer(1000);
    movement_timer.repeat = 5;

    movement_timer.on('repeat', () => {
      const distance_to_act = distance_between_points(predator_sprite, prey_sprite);

      if(distance_to_act < 200) {
        this.animation_switch('knife', 'attack');

        attack_timer.start();
      } else {
        attack_timer.stop();
        this.animation_switch('knife', 'walk');
      }


      if(
        distance_to_act < min_pathfind_distance ||
        distance_to_act > max_pathfind_distance ||
        !this.alive
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
