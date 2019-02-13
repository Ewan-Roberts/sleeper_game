'use strict';

//using this this to roughly scope out some unique enemy types
const { Enemy       } = require('./types/enemy');
const { shoot_arrow } = require('../engine/bow');
const { timer       } = require('../engine/ticker');
const { View_Aiming_Line } = require('../view/view_aiming_line');
const { radian           } = require('../utils/math');

// This is the highest level class and presumes
// components;
// (Human Inventory Predator Vitals Raycasting)

class Archer extends Enemy {
  constructor(enemy) {
    super();
    this.name = 'enemy';
    this.enemy = enemy;
    this.enemy.name = 'player';
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


class Scavenger_Insane_Dying {
  constructor() {
    this.description = 'this guy is on his last legs, he is insane';
    this.vitals = {
      health:   10,
      food:     4,
      water:    16,
      heat:     20,
      sleep:    10,
      status:   'alive',
      ticker_values: {
        health: 1,
        food:   1,
        water:  2,
        heat:   1,
        sleep:  2,
      },
    };

    this.equipped = 'rusty_knife';

    this.inventory.slots = [
      { name: 'rags' },
    ];
  }
}


class Fayetality {
  constructor() {
    this.description = 'unable to have people talk around her, unable to hear other players';
    this.vitals = {
      health:   80,
      food:     20,
      water:    70,
      heat:     90,
      sleep:    20,
      status:   'alive',
      ticker_values: {
        health: 1,
        food:   1,
        water:  2,
        heat:   1,
        sleep:  2,
      },
    };

    this.equipped = 'samurai_sword';

    this.inventory.slots = [
      { name: 'tin_of_beans' },
      { name: 'back_pack'    },
      { name: 'sleeping_bag' },
      { name: 'book'         },
      { name: 'watch'        },
    ];
  }
}

module.exports = {
  Archer,
  Scavenger_Insane_Dying,
  Fayetality,
};
