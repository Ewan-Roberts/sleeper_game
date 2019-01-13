'use strict';

const { ticker } = require('../../engine/ticker');

const { move_sprite_to_sprite_on_grid } = require('../../engine/pathfind.js');
const { distance_between_points } = require('../../engine/math');

class Predator {
  constructor() {
    this.type = 'predator';
    this.min_pathfind_distance = 10;
    this.max_pathfind_distance = 700;
  }

  attack(prey) {
    this.sprite.animation_switch('knife', 'attack');
    console.log(prey);

    prey.damage(this.inventory.equiped.damage);
    console.log(prey);

    debugger;
  }

  is_predator_to(prey) {
    const { 'sprite': prey_sprite     } = prey;
    const { 'sprite': predator_sprite } = this;

    ticker.add(() => {
      const distance_to_act = distance_between_points(predator_sprite, prey_sprite);

      if(distance_to_act < 200) {
        this.attack(prey);
        return;
      }

      if(
        distance_to_act < this.min_pathfind_distance ||
        distance_to_act > this.max_pathfind_distance ||
        !this.alive
      ) {
        return;
      }

      move_sprite_to_sprite_on_grid(predator_sprite, prey_sprite);
    });
  }
}

module.exports = {
  Predator,
};
