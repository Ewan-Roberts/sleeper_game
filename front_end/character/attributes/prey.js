'use strict';

const PIXI = require('pixi.js');
const { viewport  } = require('../../engine/viewport');
const { ticker    } = require('../../engine/ticker');

const { move_sprite_to_sprite_on_grid } = require('../../engine/pathfind.js');
const { distance_between_points } = require('../../engine/math');

const critter_container = viewport.getChildByName('critter_container');

class Prey {
  constructor() {
    this.type = 'prey';
    this.min_pathfind_distance = 50;
    this.max_pathfind_distance = 400;
  }

  is_prey_to(predator) {
    const prey  = this.sprite;

    const point_to_run_for = new PIXI.Sprite.fromFrame('bunny');
    point_to_run_for.name = 'dot';

    ticker.add(() => {
      const distance_to_act = distance_between_points(predator, prey);

      if(
        distance_to_act < this.min_pathfind_distance ||
        distance_to_act > this.max_pathfind_distance ||
        !this.alive
      ) {
        return;
      }

      point_to_run_for.position.set(prey.x + (prey.x - predator.x), prey.y +(prey.y - predator.y));

      move_sprite_to_sprite_on_grid(prey, point_to_run_for);
    });

    critter_container.addChild(point_to_run_for);
  }
}


module.exports = {
  Prey,
};
