'use strict';

const PIXI = require('pixi.js');
const { viewport  } = require('../../engine/viewport');
const { timer     } = require('../../engine/ticker');

const { move_sprite_to_sprite_on_grid } = require('../../engine/pathfind.js');
const { distance_between_points } = require('../../engine/math');

const critter_container = viewport.getChildByName('critter_container');

class Prey {
  constructor() {
    this.type = 'prey';
    this.min_pathfind_distance = 50;
    this.max_pathfind_distance = 400;
  }

  is_prey_to({ 'sprite': predator_sprite }) {
    const { 'sprite': prey_sprite } = this;

    const point_to_run_for = new PIXI.Sprite.fromFrame('bunny');
    point_to_run_for.name = 'dot';

    const movement_timer = timer.createTimer(500);
    movement_timer.repeat = 20;

    movement_timer.on('repeat', () => {
      const distance_to_act = distance_between_points(predator_sprite, prey_sprite);

      if(
        distance_to_act < this.min_pathfind_distance ||
        distance_to_act > this.max_pathfind_distance ||
        !this.alive
      ) {
        return;
      }

      point_to_run_for.position.set(
        prey_sprite.x + (prey_sprite.x - predator_sprite.x),
        prey_sprite.y + (prey_sprite.y - predator_sprite.y)
      );

      move_sprite_to_sprite_on_grid(prey_sprite, point_to_run_for);
    }).start();

    critter_container.addChild(point_to_run_for);
  }
}


module.exports = {
  Prey,
};
