'use strict';

const { Enemy       } = require('./types/enemy');
const { shoot_arrow } = require('../engine/bow');
const { timer       } = require('../engine/ticker');
const { View_Aiming_Line } = require('../view/view_aiming_line');
const { radian           } = require('../utils/math');

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
    this.logic.repeat = 5;
    this.logic.expire = true;
  }

  shoot() {
    this.sprite.rotation = radian(this.enemy.sprite, this.sprite);

    shoot_arrow(this.sprite, this.enemy.sprite);
  }

  logic_stop() {
    this.logic.stop();
  }

  logic_start() {
    this.logic.start();
    this.animation.ready_weapon();

    this.logic.on('repeat', () => {
      if(this.raycasting.contains_point(this.enemy.sprite)){
        this.sprite.rotation = radian(this.enemy.sprite, this.sprite);
        View_Aiming_Line.add_between_sprites(this.enemy.sprite, this.sprite);
        this.shoot();
      }
    });

    this.logic.on('end', () => {
      this.animation.idle();
    });
  }
}


module.exports = {
  Archer,
};
