'use strict';
//const document = ';';
const dom_hud = global.document.querySelector('.characterInventory');
const inventory_top_section = global.document.querySelector('.inventory_top_section');

class GUI_HUD {
  constructor() {}

  show() {
    dom_hud.style.display = 'block';
    this.fill_slot(0);
  }

  hide() {
    dom_hud.style.display = 'none';
  }

  fill_slot(slot) {
    const elem = global.document.createElement('img');
    elem.setAttribute('height', '90');
    elem.setAttribute('width', '90');
    // todo: need to get from spritesheet
    elem.src = 'images/bunny.png';
    inventory_top_section.children[slot].appendChild(elem);
  }

}

module.exports = {
  GUI_HUD,
};
