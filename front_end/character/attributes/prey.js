'use strict';

const PIXI = require('pixi.js');

const { timer                         } = require('../../engine/ticker');
const { move_sprite_to_sprite_on_grid } = require('../../engine/pathfind.js');
const { distance_between_points       } = require('../../engine/math');
const { critter_container             } = require('../../engine/pixi_containers');

const min = 50;
const max = 400;

class Prey {
  constructor(entity) {
    this.entity = entity;
    this.type   = 'prey';
    this.name   = 'prey';
  }

  is_prey_to(predator) {
    const prey = this.entity;
    const distance = distance_between_points(predator.sprite, prey.sprite);

    const point_to_run_for = new PIXI.Sprite.fromFrame('bunny');
    point_to_run_for.name  = 'dot';

    const movement_timer  = timer.createTimer(500);
    movement_timer.repeat = 20;
    movement_timer.on('repeat', () => {
      if(distance < min||distance > max||!prey.vitals.alive) return;

      point_to_run_for.position.set(
        prey.sprite.x + (prey.sprite.x - predator.sprite.x),
        prey.sprite.y + (prey.sprite.y - predator.sprite.y)
      );

      move_sprite_to_sprite_on_grid(prey.sprite, point_to_run_for);
    }).start();

    critter_container.addChild(point_to_run_for);
  }
}

module.exports = {
  Prey,
};
