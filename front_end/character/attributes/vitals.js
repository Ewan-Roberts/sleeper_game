'use strict';


const { blood } = require('../../cutscene/blood');

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
    this.status = 'dead';

    this.entity.animation.kill();
  }

  damage(damage) {
    if (!damage) throw new Error('No damage being recieved');

    if(this.status === 'dead') return;

    if(this.dead(damage)) {
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

