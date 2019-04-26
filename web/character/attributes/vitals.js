'use strict';

class Vitals {
  constructor({ sprite }) {
    this.name   ='vitals';
    this.sprite = sprite;

    //TODO derive from archtype data
    this.power  = 5000;
    this.speed  = 20;
    this.health = 140;
    this.food   = 40;
    this.water  = 20;
    this.heat   = 90;
    this.sleep  = 100;
    this.status = 'alive';
  }

  get alive() {
    return (this.status === 'alive');
  }

  kill() {
    this.status === 'dead';
  }

  _dead(damage) {
    this.health -= damage;

    return this.health < 0;
  }

  damage(damage) {
    if (!damage) throw new Error('No damage being recieved');
    if(this.status === 'dead') return;

    this.health -= damage;

    if(this.health < 0) this.status = 'dead';
  }
}

module.exports = {
  Vitals,
};

