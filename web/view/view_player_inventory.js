'use strict';

const { Item_Manager } = require('../items/item_manager');

const dom_hud = global.document.querySelector('.characterInventory');

function get_node_dimensions(div) {
  const style = global.window.getComputedStyle(div, null);

  return {
    height: style.getPropertyValue('height').replace('px', ''),
    width:  style.getPropertyValue('width').replace('px', ''),
  };
}

function insert_div_with_image(class_name, image_name) {
  const image = Item_Manager.extract_item_image_by_name(image_name);

  const selected_div = global.document.querySelector(class_name);
  const { height, width } = get_node_dimensions(selected_div);

  image.height = height;
  image.width  = width;

  if(selected_div.firstChild) {
    selected_div.removeChild(selected_div.firstChild);
  }

  selected_div.appendChild(image);
}

function insert_all_div_with_image(class_name, image_name) {
  const selected_divs = global.document.querySelectorAll(class_name);

  selected_divs.forEach(div => {
    const image = Item_Manager.extract_item_image_by_name(image_name);

    div.appendChild(image);
  });
}

class View_HUD {
  constructor() {
    this.name             = 'hud';
    this.background       = {};
    this.primary_weapon   = {};
    this.secondary_weapon = {};
    this.small_weapon     = {};
    this.head             = {};
    this.chest            = {};
    this.shoes            = {};
    this.hat              = {};
    this.slot_one         = {};
    this.slot_two         = {};
    this.item_slots       = [];
  }

  static toggle_inventory() {

    if(dom_hud.style.display === 'block') {
      dom_hud.style.opacity = 0;
      dom_hud.style.display = 'none';

      return;
    }

    dom_hud.style.opacity = 1;
    dom_hud.style.display = 'block';
  }

  static show_player_inventory() {
    dom_hud.style.display = 'block';
  }

  static hide_player_inventory() {
    dom_hud.style.display = 'none';
  }


  static add_primary_weapon(image_name) {
    insert_div_with_image('.primary_weapon', image_name);
    this.primary_weapon = Item_Manager.get_item_by_name(image_name);
  }

  static add_secondary_weapon(image_name) {
    insert_div_with_image('.secondary_weapon', image_name);
    this.secondary_weapon = Item_Manager.get_item_by_name(image_name);
  }

  static add_small_weapon(image_name) {
    insert_div_with_image('.small_weapon', image_name);
    this.small_weapon = Item_Manager.get_item_by_name(image_name);
  }

  static add_head(image_name) {
    insert_div_with_image('.model_head', image_name);
    this.head = Item_Manager.get_item_by_name(image_name);
  }

  static add_chest(image_name) {
    insert_div_with_image('.model_chest', image_name);
    this.chest = Item_Manager.get_item_by_name(image_name);
  }

  static add_shoes(image_name) {
    insert_div_with_image('.model_feet', image_name);
    this.shoes = Item_Manager.get_item_by_name(image_name);
  }

  static add_hat(image_name) {
    insert_div_with_image('.model_hat', image_name);
    this.hat = Item_Manager.get_item_by_name(image_name);
  }

  static add_slot_one(image_name) {
    insert_div_with_image('.model_slot_1', image_name);
    this.slot_one = Item_Manager.get_item_by_name(image_name);
  }

  static add_slot_two(image_name) {
    insert_div_with_image('.model_slot_2', image_name);
    this.slot_two = Item_Manager.get_item_by_name(image_name);
  }

  static add_background(image_name) {
    insert_div_with_image('.model_background', image_name);
    this.background = Item_Manager.get_item_by_name(image_name);
  }

  //for testing
  fill_inventory(image_name) {
    insert_all_div_with_image('.inventory_slot', image_name);
  }


  static inventory_slot(image_name, slot_number) {
    const selected_divs = global.document.querySelectorAll('.inventory_slot');
    const slot_div = selected_divs[slot_number];

    const image = Item_Manager.extract_item_image_by_name(image_name);

    const { height, width } = get_node_dimensions(slot_div);

    image.height = height;
    image.width  = width;

    if(slot_div.firstChild) {
      slot_div.removeChild(slot_div.firstChild);
    }

    slot_div.appendChild(image);
  }

  static add_item_to_inventory_slot(item) {
    if(this.item_slots.length > 10) {
      throw new Error('not enough space');
    }

    this.item_slots.push(item);
  }

  static populate_free_slot(image_name) {
    const item = Item_Manager.get_item_by_name(image_name);
    const inventory_slots = global.document.querySelectorAll('.inventory_slot');
    const first_free_slot = Array.from(inventory_slots)
      .find(slot => slot.childElementCount === 0);

    //TODO: handle this error and give a nice error to the user
    if(!first_free_slot) {
      throw new Error('there are no free slots!');
    }

    if(!item) {
      throw new Error('item doesnt exist ' + image_name);
    }

    if(item.image_name === 'bunny') {
      throw new Error('bunny, replace me');
    }

    const { height, width } = get_node_dimensions(first_free_slot);

    const image  = Item_Manager.extract_item_image_by_name(item.image_name);
    image.height = height;
    image.width  = width;

    first_free_slot.appendChild(image);
    this.add_item_to_inventory_slot(item);
  }
}

module.exports = {
  View_HUD,
};
