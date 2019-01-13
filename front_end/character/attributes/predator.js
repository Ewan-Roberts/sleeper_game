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

  attack() {
    this.sprite.animation_switch('knife', 'attack');
  }

  is_predator_to(prey) {
    const predator = this.sprite;

    ticker.add(() => {
      const distance_to_act = distance_between_points(predator, prey);

      if(distance_to_act < 200) {
        this.attack();
        return;
      }

      if(
        distance_to_act < this.min_pathfind_distance ||
        distance_to_act > this.max_pathfind_distance ||
        !this.alive
      ) {
        return;
      }

      move_sprite_to_sprite_on_grid(predator, prey);
    });
  }
}

module.exports = {
  Predator,
};
