'use strict';

const PIXI = require('pixi.js');
const viewport = require('../../engine/viewport');
const ticker = require('../../engine/ticker');

const {
  move_sprite_to_sprite_on_grid,
} = require('../../engine/pathfind.js');
const { distance_between_points } = require('../../engine/math');

class Predator {
  constructor() {
    this.type = 'predator';
  }

  attack() {
    this.sprite.animation_switch('knife', 'attack');
  }

  is_predator_to(prey) {
    //let testing = 0;

    this.min_pathfind_distance = 10;
    this.max_pathfind_distance = 700;

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
        !this.sprite.status.alive
      ) {
        return;
      }
      //if(testing> 3) return;

      //console.log(distance_to_act);

      move_sprite_to_sprite_on_grid(predator, prey);

      //testing++;
    });
  }
}

module.exports = {
  Predator,
};
