'use strict';

class Vitals {
  constructor() {
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

  kill() {
    //this.entity.switch('dead');
  }

  dead(damage) {
    return this.health - damage < 0;
  }

  damage(damage) {
    if (!damage) throw new Error('No damage being recieved');

    if(this.dead(damage)) {
      this.status = 'dead';

      throw new Error(`${this.name} doesnt have enough health`);
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

