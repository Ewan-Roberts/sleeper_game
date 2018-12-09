'use strict';
//const document = ';';
const dom_hud = global.document.querySelector('.characterInventory');
const inventory_top_section = global.document.querySelector('.inventory_top_section');
const socket = require('../engine/socket');

class GUI_HUD {
  constructor() {
    socket.on('player_inventory', inventory_data => {
      inventory_data.items.forEach(item => {
        this.fill_slot(item.slot, item.name);
      });
    });

    this.inventory = {};
  }

  show() {
    dom_hud.style.display = 'block';
    //this.fill_slot(0);
    const player = {};
    // replace with uuid and shit
    player.id = '1';
    socket.emit('get_inventory', player.id);
  }

  hide() {
    dom_hud.style.display = 'none';
  }

  fill_slot(slot, name) {
    const elem = global.document.createElement('img');
    elem.setAttribute('height', '90');
    elem.setAttribute('width', '90');
    // todo: need to get from spritesheet
    elem.src = `images/${name}.png`;
    inventory_top_section.children[slot].appendChild(elem);
  }



}

module.exports = {
  GUI_HUD,
};
