'use strict';
const PIXI = require('pixi.js');

const { Enemy            } = require('./types/enemy');
const { shoot_arrow      } = require('../engine/bow');
const { timer            } = require('../engine/ticker');
const { View_Aiming_Line } = require('../view/view_aiming_line');
const {
  radian,
  distance_between_points,
} = require('../utils/math');

const { PathFind } = require('../engine/pathfind.js');

/* This is the highest level class and presumes
 *  Components;
 *  (Human Inventory Predator Vitals Raycasting)
 */
class Archer extends Enemy {
  constructor(enemy) {
    super();
    this.name  = 'enemy';
    this.enemy = enemy;
    this.logic = timer.createTimer(1000);
    this.logic.repeat = 20;
    this.logic.expire = true;
  }

  shoot() {
    this.animation.weapon = 'bow';
    this.animation.ready_weapon();

    View_Aiming_Line.add_between_sprites(this.enemy.sprite, this.sprite);

    this.sprite.rotation = radian(this.enemy.sprite, this.sprite);

    shoot_arrow(this.sprite, this.enemy.sprite);
  }

  melee() {
    this.animation.weapon = 'knife';
    this.animation.attack();
  }


  stop_moving() {
    const tweens = PIXI.tweenManager.getTweensForTarget(this.sprite);
    tweens.forEach(tween => {
      PIXI.tweenManager.removeTween(tween);
    });
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
        const target_at_range =
          distance_between_points(this.enemy.sprite, this.sprite) > 500;
        this.stop_moving();

        if(target_at_range) {
          this.shoot();
          return;
        }

        this.melee();
        return;
      }

      this.walk_to_enemy();
    });

    this.logic.on('end', () => {
      this.animation.idle();
    });
  }

  logic_stop() {
    this.logic.stop();
  }
}


module.exports = {
  Archer,
};
