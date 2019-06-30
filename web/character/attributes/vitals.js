class Vitals {
  constructor() {
    this.name   ='vitals';
    this.power  = 5000;
    this.speed  = 10;
    this.health = 100;
    this.food   = 40;
    this.water  = 20;
    this.heat   = 90;
    this.sleep  = 100;
    this.status = 'alive';
  }

  get alive() {
    return (this.status === 'alive');
  }

  _kill() {
    if (this.status === 'dead') return;
    this.status = 'dead';
  }

  _dead(damage) {
    this.health -= damage;

    return this.health < 0;
  }

  damage(damage) {
    if (!damage) throw new Error('No damage being recieved');
    if(this.status === 'dead') return;


    this.health -= damage;
    if(this.health < 0) this._kill();
  }
}

module.exports = {
  Vitals,
};

