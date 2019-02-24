'use strict';

const { blood } = require('../../cutscene/blood');
const { Game  } = require('../../engine/save_manager');

class Vitals {
  constructor(entity) {
    this.entity = entity;
    this.name   ='vitals';
    this.speed  = 15;
    this.power  = 5000;
    this.health = 140;
    this.food   = 40;
    this.water  = 20;
    this.heat   = 90;
    this.sleep  = 100;
    this.status = 'alive';
  }

  get alive() { return (this.status === 'alive'); }

  _dead(damage) {
    this.health -= damage;

    return this.health < 0;
  }

  _kill() {
    if(this.entity.name === 'player') Game.over();

    this.status = 'dead';
    this.entity.kill();
  }

  damage(damage) {
    if (!damage) throw new Error('No damage being recieved');
    if(this.status === 'dead') return;
    const is_dead = this._dead(damage);

    if(is_dead) {
      blood.add_at_point(this.entity.sprite);
      this._kill();
    }
  }
}

module.exports = {
  Vitals,
};

