'use strict';

const { Item_Manager } = require('../items/item_manager');
const { Item_Menu    } = require('./item_menu');

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

class Player_Inventory {
  constructor() {
    this.hud = global.document.querySelector('.characterInventory');
    this.inventory_slots = global.document.querySelectorAll('.inventory_slot');
    this.inventory = global.document.querySelector('.characterInventory .inventory');
    this.character_model = global.document.querySelector('.characterModel');

  }

  character_tile(image_name) {
    insert_div_with_image('.primary_weapon', image_name);
    insert_div_with_image('.secondary_weapon', image_name);
    insert_div_with_image('.small_weapon', image_name);
    insert_div_with_image('.model_head', image_name);
    insert_div_with_image('.model_chest', image_name);
    insert_div_with_image('.model_feet', image_name);
    insert_div_with_image('.model_hat', image_name);
    insert_div_with_image('.model_slot_1', image_name);
    insert_div_with_image('.model_slot_2', image_name);
    insert_div_with_image('.model_background', image_name);
  }

  toggle_inventory() {
    if(this.hud.style.display === 'block') {
      this.hud.style.opacity = 0;
      this.hud.style.display = 'none';

      return;
    }

    this.hud.style.opacity = 1;
    this.hud.style.display = 'block';
  }

  show(option) {
    if(option === 'thin') {
      this.hud.style.width = '80%';
      this.hud.style.right = '0';
      this.inventory.style.width = '80%';
      this.inventory.style['padding-left'] = '0';
      this.character_model.style.display = 'none';
    }

    if(option === 'wide') {
      this.hud.style.width = '100%';
      this.inventory.style['padding-left'] = '20%';
      this.inventory.style.width = '61%';
      this.character_model.style.display = 'block';
    }

    this.toggle_inventory();
  }

  clear () {
    this.inventory_slots = global.document.querySelectorAll('.inventory_slot');
    this.inventory_slots.forEach(slot => {
      if(slot.firstChild) slot.firstChild.remove();
    });
  }

  add_primary_weapon(image_name) {
    insert_div_with_image('.primary_weapon', image_name);
    this.primary_weapon = Item_Manager.get_item_by_name(image_name);
  }

  populate_free_slot(item) {
    const first_free_slot = Array.from(this.inventory_slots)
      .find(slot => slot.childElementCount === 0);

    if(!first_free_slot) {
      throw new Error('there are no free slots!');
    }
    const { height, width } = get_node_dimensions(first_free_slot);

    const image  = Item_Manager.extract_image_by_item_object(item);
    image.height = height;
    image.width  = width;

    first_free_slot.appendChild(image);

    const menu = new Item_Menu();
    image.onclick = ({clientX,clientY}) => {
      menu.set_position({
        x: clientX,
        y: clientY,
      });
      menu.populate(item);
      menu.show();
    };
  }

  fill_inventory(image_name) {
    insert_all_div_with_image('.inventory_slot', image_name);
  }

  inventory_slot(image_name, slot_number) {
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

}


module.exports = {
  Player_Inventory,
};
