'use strict';

const event     = require('events');
const { Blood } = require('../../effects/blood');

class Vitals {
  constructor({ sprite }) {
    this.name   ='vitals';

    this.sprite = sprite;
    this.blood = new Blood();

    //TODO derive from archtype data
    this.power  = 5000;
    this.speed  = 20;
    this.health = 140;
    this.food   = 40;
    this.water  = 20;
    this.heat   = 90;
    this.sleep  = 100;
    this.status = 'alive';
    this.sprite.events = new event();
    this.sprite.events.on('damage', damage => this.on_hit(damage));
  }

  get alive() {
    return (this.status === 'alive');
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

