'use strict';

const { status_meter } = require('../../view/status_meter');

class Status_Meter{
  constructor() {
    this.name = 'status_meter';
  }

  static update_vitals(vital_data) {
    status_meter.update(vital_data);
  }

  set_vitals_ticker() {
    setInterval(()=> {
      this.vitals.health -= this.vitals.ticker_values.health;
      this.vitals.food -= this.vitals.ticker_values.food;
      this.vitals.water -= this.vitals.ticker_values.water;
      this.vitals.heat -= this.vitals.ticker_values.heat;
      this.vitals.sleep -= this.vitals.ticker_values.sleep;
      this.update_vitals(this.vitals);
    }, 5000);
  }
}

module.exports = {
  Status_Meter,
};
