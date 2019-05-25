'use strict';
const { Sprite       } = require('pixi.js');
const { renderer     } = require('../engine/app');
const { Item_Manager } = require('../items/item_manager');
const { Item_Menu    } = require('./item_menu');

function get_node_dimensions(div) {
  const style = global.window.getComputedStyle(div);
  return {
    height: style.getPropertyValue('height').replace('px', ''),
    width:  style.getPropertyValue('width').replace('px', ''),
  };
}

class Slot {
  constructor({id,image_name, category}, div_name) {
    this.id = id;
    this.category = category;

    const sprite = new Sprite.fromFrame(image_name || 'bunny');
    this.image = renderer.plugins.extract.image(sprite);

    const divs = global.document.querySelectorAll(div_name);
    this.div_slots = Array.from(divs);
    this.render();
    this.menu();
  }

  set click(func) {
    this.image.onclick = func;
  }

  menu() {
    this.image.oncontextmenu = event => {
      const menu = new Item_Menu(this.category);
      menu.set_position(event);
      menu.show();
      return false;
    };
  }

  set height(value) {
    this.image.height = value;
  }

  remove() {
    this.image.remove();
  }

  set width(value) {
    this.image.width = value;
  }

  render() {
    const free_slot = this.div_slots.find(slot => slot.childElementCount === 0);
    if(!free_slot) return;
    const { height, width } = get_node_dimensions(free_slot);
    this.height = height;
    this.width  = width;

    free_slot.appendChild(this.image);
  }
}


class Player_Inventory {
  constructor() {
    this.hud = global.document.querySelector('.characterInventory');
    this.inventory_slots = global.document.querySelectorAll('.inventory_slot');
    this.inventory = global.document.querySelector('.characterInventory .inventory');
    this.character_model = global.document.querySelector('.characterModel');
  }

  fill_inventory(image_name) {
    this.clear();
    const selected_divs = global.document.querySelectorAll('.inventory_slot');
    selected_divs.forEach(div => {
      const image = Item_Manager.extract_item_image_by_name(image_name);

      div.appendChild(image);
    });
  }

  character_tile(item) {
    new Slot(item, '.primary_weapon');
    new Slot(item, '.secondary_weapon');
    new Slot(item, '.small_weapon');
    new Slot(item, '.model_head');
    new Slot(item, '.model_chest');
    new Slot(item, '.model_feet');
    new Slot(item, '.model_hat');
    new Slot(item, '.model_slot_1');
    new Slot(item, '.model_slot_2');
    new Slot(item, '.model_background');
  }

  toggle() {
    if(this.hud.style.display === 'block') {
      this.hide();
      return;
    }

    this.show();
  }

  thin() {
    this.hud.style.width = '80%';
    this.hud.style.right = '0';
    this.inventory.style.width = '80%';
    this.inventory.style['padding-left'] = '0';
    this.character_model.style.display = 'none';
  }

  show() {
    this.hud.style.display = 'block';
  }

  hide() {
    this.hud.style.display = 'none';
  }

  wide() {
    this.hud.style.width = '100%';
    this.inventory.style['padding-left'] = '20%';
    this.inventory.style.width = '61%';
    this.character_model.style.display = 'block';
  }

  clear () {
    this.inventory_slots.forEach(slot => {
      if(slot.firstChild) slot.firstChild.remove();
    });
  }

  add_primary_weapon(item) {
    new Slot(item, '.primary_weapon');
  }

  populate_with_items(items) {
    this.clear();
    const slots = items.map(item => new Slot(item, '.inventory_slot'));

    return slots;
  }
}


module.exports = {
  Player_Inventory,
};
