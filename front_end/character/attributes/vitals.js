'use strict';

class Vitals {
  constructor() {
    this.name           ='vitals';
    this.movement_speed = 15;
    this.power          = 1000;
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

  damage(hit_point) {
    if (!hit_point) throw new Error('No damage being recieved');
    if( (this.health - hit_point) < 0) {
      this.status = 'dead';

      throw `${this.name} doesnt have enough health`;
    } else {
      this.health -= hit_point;
    }
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

