'use strict';

const dom_hud = global.document.querySelector('.characterInventory');
const inventory_top_section = global.document.querySelector('.inventory_top_section');


class GUI_HUD {
  constructor() {
    this.inventory = {};
  }

  show() {
    dom_hud.style.display = 'block';
    const player = {};
    player.id = '1';
  }

  hide() {
    dom_hud.style.display = 'none';
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


  fill_slot(item) {
    inventory_top_section.children[item.slot].innerHTML = '';
    const elem = global.document.createElement('img');
    elem.setAttribute('height', '90');
    elem.setAttribute('width', '90');
    // todo: need to get from spritesheet
    elem.src = `images/${item.name}.png`;
    inventory_top_section.children[item.slot].appendChild(elem);
  }

}

module.exports = {
  GUI_HUD,
};
