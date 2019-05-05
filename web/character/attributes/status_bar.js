'use strict';

const { tweenManager } = require('pixi.js');
const { status_meter } = require('../../view/view_player_status_meter');

class Status {
  constructor() {
    this.name = 'status_meter';
  }

  static update_vitals(vital_data) {
    status_meter.update(vital_data);
  }

  set_vitals_ticker() {
    const vitals_timer = tweenManager.createTween();
    vitals_timer.time   = 5000;
    vitals_timer.expire = true;
    vitals_timer.repeat = 4;

    vitals_timer.on('repeat', function() {
      this.vitals.health -= this.vitals.ticker_values.health;
      this.vitals.food   -= this.vitals.ticker_values.food;
      this.vitals.water  -= this.vitals.ticker_values.water;
      this.vitals.heat   -= this.vitals.ticker_values.heat;
      this.vitals.sleep  -= this.vitals.ticker_values.sleep;

      this.update_vitals(this.vitals);
    });
  }
}

module.exports = {
  Status,
};
