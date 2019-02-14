'use strict';

const PIXI = require('pixi.js');

const { timer    } = require('../engine/ticker');
const { PathFind } = require('../engine/pathfind.js');
const { Entity_Container } = require('../engine/entity_container.js');

const { Enemy } = require('./types/enemy');
const { Melee } = require('./attributes/melee');
const { Range } = require('./attributes/ranged');
const { distance_between_points } = require('../utils/math');

/* This is the highest level class and presumes
 *  Components;
 *  (Human Inventory Predator Vitals Raycasting)
 */
class Archer extends Enemy {
  constructor(enemy) {
    super();
    this.name  = 'enemy';

    this.add_component(new Melee('rusty_knife'));
    this.add_component(new Range('old_bow'));
    this.enemy = enemy;
    this.logic = timer.createTimer(800);
    this.logic.repeat = 20;
    this.logic.expire = true;

    Entity_Container.add(this);
  }

  stop_moving() {
    const tweens = PIXI.tweenManager.getTweensForTarget(this.sprite);

    tweens.forEach(tween => PIXI.tweenManager.removeTween(tween));
  }

  walk_to_enemy() {
    this.animation.walk();

    PathFind.move_sprite_to_sprite_on_grid(this.sprite, this.enemy.sprite);
  }

  logic_start() {
    this.logic.start();
    this.animation.ready_weapon();

    this.logic.on('repeat', () => {
      const can_see_enemy = this.raycasting.contains_point(this.enemy.sprite);

      if(can_see_enemy){
        this.stop_moving();

        const target_at_range =
          distance_between_points(this.enemy.sprite, this.sprite) > 200;

        if(target_at_range) return this.range.attack_from_to(this, this.enemy);

        return this.melee.attack_from_to(this, this.enemy);
      }

      return this.walk_to_enemy();
    });

    this.logic.on('end', () => this.animation.idle());
  }

  logic_stop() {
    this.logic.stop();
  }
}


module.exports = {
  Archer,
};
