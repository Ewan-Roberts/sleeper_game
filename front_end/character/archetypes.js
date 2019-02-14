'use strict';

const PIXI = require('pixi.js');

const { shoot_arrow  } = require('../engine/ranged');
const { timer        } = require('../engine/ticker');
const { PathFind     } = require('../engine/pathfind.js');

const { Enemy            } = require('./types/enemy');
const { Melee            } = require('./attributes/melee');
const { View_Aiming_Line } = require('../view/view_aiming_line');
const { radian, distance_between_points } = require('../utils/math');

/* This is the highest level class and presumes
 *  Components;
 *  (Human Inventory Predator Vitals Raycasting)
 */
class Archer extends Enemy {
  constructor(enemy) {
    super();
    this.name  = 'enemy';
    this.enemy = enemy;
    this.logic = timer.createTimer(800);
    this.logic.repeat = 20;
    this.logic.expire = true;
    this.add_component(new Melee('knife'));
  }

  shoot() {
    this.inventory.equip_weapon_by_name('old_bow');
    this.animation.weapon = 'bow';
    this.animation.ready_weapon();

    this.sprite.rotation = radian(this.enemy.sprite, this.sprite);

    View_Aiming_Line.add_between_sprites(this.enemy.sprite, this.sprite);

    setTimeout(() => shoot_arrow(this, this.enemy),1000);
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

        if(target_at_range) return this.shoot();

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
