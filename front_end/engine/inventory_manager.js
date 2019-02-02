'use strict';

const {
  extract_item_image_by_name,
  get_item_by_name,
  extract_image_by_item_object,
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
    this.inventory = {
      background:       {},
      primary_weapon:   {},
      secondary_weapon: {},
      small_weapon:     {},
      head:             {},
      chest:            {},
      shoes:            {},
      hat:              {},
      slot_one:         {},
      slot_two:         {},
      item_slots:       [],
    };
  }

  primary_weapon(image_name) {
    insert_div_with_image('.primary_weapon', image_name);
    this.inventory.primary_weapon = get_item_by_name(image_name);
  }

  secondary_weapon(image_name) {
    insert_div_with_image('.secondary_weapon', image_name);
    this.inventory.secondary_weapon = get_item_by_name(image_name);
  }

  small_weapon(image_name) {
    insert_div_with_image('.small_weapon', image_name);
    this.inventory.small_weapon = get_item_by_name(image_name);
  }

  head(image_name) {
    insert_div_with_image('.model_head', image_name);
    this.inventory.head = get_item_by_name(image_name);
  }

  chest(image_name) {
    insert_div_with_image('.model_chest', image_name);
    this.inventory.chest = get_item_by_name(image_name);
  }

  shoes(image_name) {
    insert_div_with_image('.model_feet', image_name);
    this.inventory.shoes = get_item_by_name(image_name);
  }

  hat(image_name) {
    insert_div_with_image('.model_hat', image_name);
    this.inventory.hat = get_item_by_name(image_name);
  }

  slot_one(image_name) {
    insert_div_with_image('.model_slot_1', image_name);
    this.inventory.slot_one = get_item_by_name(image_name);
  }

  slot_two(image_name) {
    insert_div_with_image('.model_slot_2', image_name);
    this.inventory.slot_two = get_item_by_name(image_name);
  }

  background(image_name) {
    insert_div_with_image('.model_background', image_name);
    this.inventory.background = get_item_by_name(image_name);
  }

  //for testing
  fill_inventory(image_name) {
    insert_all_div_with_image('.inventory_slot', image_name);
  }


  inventory_slot(image_name, slot_number) {
    const selected_divs = global.document.querySelectorAll('.inventory_slot');
    const slot_div = selected_divs[slot_number];

    const image = extract_item_image_by_name(image_name);

    const style = global.window.getComputedStyle(slot_div, null);

    image.height = style.getPropertyValue('height').replace('px', '');
    image.width  = style.getPropertyValue('width').replace('px', '');

    if(slot_div.firstChild) {
      slot_div.removeChild(slot_div.firstChild);
    }

    slot_div.appendChild(image);
  }

  add_item_to_inventory_slot(item) {
    if(this.inventory.item_slots.length > 10) {
      throw new Error('not enough space');
    }

    this.inventory.item_slots.push(item);

  }

  get_node_dimensions(div) {
    const style = global.window.getComputedStyle(div, null);

    return {
      height: style.getPropertyValue('height').replace('px', ''),
      width:  style.getPropertyValue('width').replace('px', ''),
    };
  }

  populate_free_slot(image_name) {
    const item = get_item_by_name(image_name);
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

    const { height, width } = this.get_node_dimensions(first_free_slot);

    const image  = extract_item_image_by_name(item.image_name);
    image.height = height;
    image.width  = width;

    first_free_slot.appendChild(image);
    this.add_item_to_inventory_slot(item);
  }

}


module.exports = {
  PlayerVisualModel,
};
