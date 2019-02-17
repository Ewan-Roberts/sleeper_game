'use strict';

const { blood } = require('../../cutscene/blood');
const { Game  } = require('../../engine/save_manager');

class Vitals {
  constructor(entity) {
    this.entity         = entity;
    this.name           ='vitals';
    this.movement_speed = 15;
    this.power          = 5000;
    this.health         = 100;
    this.food           = 40;
    this.water          = 20;
    this.heat           = 90;
    this.sleep          = 100;
    this.status         = 'alive';
  }

  dead(damage) {
    return this.health - damage < 0;
  }

  kill() {
    if(this.entity.name === 'player') Game.over();

    if('loot'  in this.entity) this.entity.loot.populate();
    //if('logic' in this.entity) this.entity.logic.stop();

    this.entity.animation.kill();
    this.status = 'dead';
  }

  damage(damage) {
    if (!damage) throw new Error('No damage being recieved');
    if(this.status === 'dead') return;

    const is_dead = this.dead(damage);

    if(is_dead) {
      blood.add_at_point(this.entity.sprite);

      this.kill();
    }

    this.health -= damage;
  }

  get alive() {
    return (this.status === 'alive');
  }

  increase_food(number) {
    if(this.food + number < 100 ) {
      this.food += number;
    }
  }
}

module.exports = {
  Vitals,
};

