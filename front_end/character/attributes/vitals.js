'use strict';

const dom_hud = global.document.querySelector('.characterInventory');

class Vitals {
  constructor() {
    this.vitals = {
      health:   100,
      food:     40,
      water:    20,
      heat:     90,
      sleep:    100,
      status:   'alive',
      ticker_values: {
        health: 5,
        food:   5,
        water:  5,
        heat:   5,
        sleep:  5,
      },
    };
  }

  toggle_player_inventory() {

    if(dom_hud.style.display === 'block') {
      dom_hud.style.display = 'none';
    } else {
      dom_hud.style.display = 'block';
    }
  }

  show_player_inventory() {
    dom_hud.style.display = 'block';
  }

  hide_player_inventory() {
    dom_hud.style.display = 'none';
  }

  kill() {
    //death animation
    this.animation_switch('knife', 'attack');
  }

  set status(state) {
    this.vitals.status = state;
  }

  damage(hit_point) {
    if(( this.vitals.health - hit_point) < 0) {
      this.status = 'dead';

      throw `${this.name} doesnt have enough health`;
    } else {
      this.vitals.health -= hit_point;
    }
  }

  get alive() {
    if(this.vitals.status === 'alive') {
      return true;
    }

    return false;
  }

  static update_status_meter(selector, amount) {
    if(amount <= 0) return;

    const status = global.document.querySelector(selector);

    status.innerHTML = amount;
    status.style.width = amount + '%';
    status.style.opacity = amount / 100;
  }

  static update_vitals(vital_data) {

    this.update_status_meter('.health_remaining', vital_data.health);
    this.update_status_meter('.food_remaining', vital_data.food);
    this.update_status_meter('.water_remaining', vital_data.water);
    this.update_status_meter('.heat_remaining', vital_data.heat);
    this.update_status_meter('.sleep_remaining', vital_data.sleep);

  }

  increase_food(number) {
    if(this.vitals.food + number < 100 ) {
      this.vitals.food += number;
    }
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
  Vitals,
};

