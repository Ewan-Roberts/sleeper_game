'use strict';

const { Blood } = require('../../view/types/blood');
const { Game  } = require('../../engine/save_manager');

class Vitals {
  constructor({ sprite, logic }) {
    this.name   ='vitals';

    this.sprite = sprite;
    this.logic = logic;
    this.blood = new Blood();

    //TODO derive from archtype data
    this.power  = 5000;
    this.speed  = 50;
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
    if(this.name === 'player') Game.over();

    this.status = 'dead';
    // this.logic.kill();
  }

  damage(damage) {
    if (!damage) throw new Error('No damage being recieved');
    if(this.status === 'dead') return;
    const is_dead = this._dead(damage);

    if(is_dead) {
      this.blood.add_at(this.sprite);

      this._kill();
    }
  }
}

module.exports = {
  Vitals,
};

