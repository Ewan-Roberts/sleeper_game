'use strict';

const PIXI = require('pixi.js');
const viewport = require('../../engine/viewport');
const rat_animations = require('../animations/rat');
const {
  move_sprite_to_point,
  move_sprite_to_sprite_on_grid,
} = require('../../engine/pathfind');

const { Inventory } = require('../attributes/inventory');
const { Vitals } = require('../attributes/vitals');
const { distance_between_points } = require('../../engine/math');

const ticker = require('../../engine/ticker');

const critter_container = viewport.getChildByName('critter_container');

class Rat {
  constructor() {
    this.sprite = new PIXI.extras.AnimatedSprite(rat_animations.move);
    this.sprite.animations = rat_animations;
    this.sprite.anchor.set(0.5);
    this.sprite.animationSpeed = 0.4;
    this.sprite.play();
    this.sprite.name = 'rat';
    this.sprite.height *= 2;
    this.sprite.width *= 2;
    this.sprite.inventory = new Inventory();
    this.sprite.inventory.create_visual_container();

    // for testing
    this.sprite.status = new Vitals();

    critter_container.addChild(this.sprite);
  }

  create_patrol_path(path_data) {
    this.sprite.patrol_path = path_data;
  }

  lootable_on_death() {
    this.sprite.kill = () => {

      this.sprite.stop();
      this.sprite.interactive = true;
      this.sprite.buttonMode = true;
      this.sprite.texture = this.sprite.animations.dead;
      this.sprite.status = 'dead';

      const get_tween = PIXI.tweenManager.getTweensForTarget(this.sprite);
      if(get_tween[0]) {
        get_tween[0].stop();
      }

      this.lootable();
    };
  }

  lootable() {
    this.sprite.click = () => {
      console.log(this.sprite.inventory)

      this.sprite.inventory.set_position(this.sprite);
    };
  }

  set_position(point) {
    this.sprite.position.set(point.x, point.y);
  }

  is_prey_to(predator) {
    this.min_pathfind_distance = 50;
    this.max_pathfind_distance = 400;

    const prey  = this.sprite;

    const point_to_run_for = new PIXI.Sprite.fromFrame('bunny');
    point_to_run_for.name = 'dot';

    ticker.add(() => {
      const distance_to_act = distance_between_points(predator, prey);

      if(
        distance_to_act < this.min_pathfind_distance ||
        distance_to_act > this.max_pathfind_distance ||
        !this.sprite.status.alive
      ) {
        return;
      }

      point_to_run_for.position.set(prey.x + (prey.x - predator.x), prey.y +(prey.y - predator.y));

      move_sprite_to_sprite_on_grid(prey, point_to_run_for);
    });

    critter_container.addChild(point_to_run_for);
  }

  move_to_point(point) {
    move_sprite_to_point(this.sprite, {
      middle: {
        x: point.x,
        y: point.y,
      },
    });
  }
}

module.exports = {
  Rat,
};
