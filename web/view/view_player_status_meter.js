'use strict';

const { Selector } = require('../utils/dom');

class Meter extends Selector {

  set value(amount) {
    this.element.innerHTML = amount;
    this.element.width     = amount + '%';
    this.element.opacity   = amount;
  }
}


class status_meter {
  constructor() {
    this.health_remaining = Meter('.health_remaining');
    this.food_remaining   = Meter('.food_remaining');
    this.water_remaining  = Meter('.water_remaining');
    this.heat_remaining   = Meter('.heat_remaining');
    this.sleep_remaining  = Meter('.sleep_remaining');
  }

  static update(data) {
    this.health_remaining.value = data.health;
    this.food_remaining.value   = data.food;
    this.water_remaining.value  = data.water;
    this.heat_remaining.value   = data.heat;
    this.sleep_remaining.value  = data.sleep;
  }
}

module.exports = {
  status_meter,
};
