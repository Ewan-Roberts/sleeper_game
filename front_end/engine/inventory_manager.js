'use strict';

const {
  extract_item_image_by_name,
} = require('../items/item_data');

function insert_div_with_image(class_name, image_name) {
  const image = extract_item_image_by_name(image_name);

  const selected_div = global.document.querySelector(class_name);
  const style = global.window.getComputedStyle(selected_div, null);

  image.height = style.getPropertyValue('height').replace('px', '');
  image.width  = style.getPropertyValue('width').replace('px', '');

  if(selected_div.firstChild) {
    selected_div.removeChild(selected_div.firstChild);
  }

  selected_div.appendChild(image);
}

function insert_all_div_with_image(class_name, image_name) {
  const selected_divs = global.document.querySelectorAll(class_name);

  selected_divs.forEach(div => {
    const image = extract_item_image_by_name(image_name);

    div.appendChild(image);
  });
}


class PlayerVisualModel {
  constructor() {
  }

  primary_weapon(image_name) {
    insert_div_with_image('.primary_weapon', image_name);
  }

  secondary_weapon(image_name) {
    insert_div_with_image('.secondary_weapon', image_name);
  }

  small_weapon(image_name) {
    insert_div_with_image('.small_weapon', image_name);
  }

  head(image_name) {
    insert_div_with_image('.model_head', image_name);
  }

  chest(item_name) {
    insert_div_with_image('.model_chest', item_name);
  }

  shoes(item_name) {
    insert_div_with_image('.model_feet', item_name);
  }

  hat(item_name) {
    insert_div_with_image('.model_hat', item_name);
  }

  slot_one(item_name) {
    insert_div_with_image('.model_slot_1', item_name);
  }

  slot_two(item_name) {
    insert_div_with_image('.model_slot_2', item_name);
  }

  background(item_name) {
    insert_div_with_image('.model_background', item_name);
  }

  inventory(item_name) {
    insert_all_div_with_image('.inventory_slot', item_name);
  }

  inventory_slot(item_name, slot_number) {

    const selected_divs = global.document.querySelectorAll('.inventory_slot');
    const slot_div = selected_divs[slot_number];

    const image = extract_item_image_by_name(item_name);

    const style = global.window.getComputedStyle(slot_div, null);

    image.height = style.getPropertyValue('height').replace('px', '');
    image.width  = style.getPropertyValue('width').replace('px', '');

    if(slot_div.firstChild) {
      slot_div.removeChild(slot_div.firstChild);
    }

    slot_div.appendChild(image);
  }

}

module.exports = {
  PlayerVisualModel,
};
