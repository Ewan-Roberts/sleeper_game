'use strict';

function update_meter_with_value (selector, value) {
  selector.innerHTML     = value;
  selector.style.width   = value + '%';
  selector.style.opacity = value / 100;
}

const select = name => global.document.querySelector(name);

const health_remaining = select('.health_remaining');
const food_remaining   = select('.food_remaining');
const water_remaining  = select('.water_remaining');
const heat_remaining   = select('.heat_remaining');
const sleep_remaining  = select('.sleep_remaining');

class status_meter {
  static update(data) {
    update_meter_with_value(health_remaining, data.health);
    update_meter_with_value(food_remaining,   data.food);
    update_meter_with_value(water_remaining,  data.water);
    update_meter_with_value(heat_remaining,   data.heat);
    update_meter_with_value(sleep_remaining,  data.sleep);
  }

}

module.exports = {
  status_meter,
};
