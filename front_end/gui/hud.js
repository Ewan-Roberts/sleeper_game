'use strict';

const dom_hud = global.document.querySelector('.characterInventory');
const inventory_top_section = global.document.querySelector('.inventory_top_section');
const socket = require('../engine/socket');

class GUI_HUD {
  constructor() {
    // only store inventory on the backend
    // future Ewan, bind this to the player
    socket.on('player_inventory', inventory_data => {

      inventory_data.items.forEach(item => {
        this.fill_slot(item);
      });

    });

    this.inventory = {};
  }

  show() {
    dom_hud.style.display = 'block';
    const player = {};

    // replace with uuid and shit
    player.id = '1';
    socket.emit('get_inventory', player.id);
  }

  hide() {
    dom_hud.style.display = 'none';
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
