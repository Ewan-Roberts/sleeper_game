'use strict';

const {
  timer,
} = require('../../engine/ticker');

const { move_sprite_to_sprite_on_grid } = require('../../engine/pathfind.js');
const { distance_between_points } = require('../../engine/math');

class Predator {
  constructor() {
    this.type = 'predator';
    this.min_pathfind_distance = 10;
    this.max_pathfind_distance = 700;
  }

  is_predator_to(prey) {
    const { 'sprite': prey_sprite     } = prey;
    const { 'sprite': predator_sprite } = this;

    const attack_timer = timer.createTimer(500);// based on the weapon speed
    attack_timer.loop = true;
    attack_timer.on('repeat', () => {
      if(prey.alive){
        prey.damage(this.weapon_damage);
      }

      prey.sprite.animation_switch('dead');

      console.log(prey);

    });

    const movement_timer = timer.createTimer(1000);
    movement_timer.repeat = 5;
    movement_timer.on('repeat', () => {
      const distance_to_act = distance_between_points(predator_sprite, prey_sprite);

      if(distance_to_act < 200) {
        this.sprite.animation_switch('knife', 'attack');

        attack_timer.start();
        return;
      }

      attack_timer.stop();

      if(
        distance_to_act < this.min_pathfind_distance ||
        distance_to_act > this.max_pathfind_distance ||
        !this.alive
      ) {
        return;
      }

      move_sprite_to_sprite_on_grid(predator_sprite, prey_sprite);
    });

    movement_timer.start();

  }
}

module.exports = {
  Predator,
};
