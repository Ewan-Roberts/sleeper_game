'use strict';

const {
  extract_item_image_by_name,
} = require('../items/item_data');

function insert_div_with_image(class_name, image_name) {
  const image = extract_item_image_by_name(image_name);

  const selected_div = global.document.querySelector(class_name);
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

insert_all_div_with_image('.inventory_slot', 'skull_cap_bone');

insert_div_with_image('.model_head',          'skull_cap_bone');
insert_div_with_image('.model_chest',         'skull_cap_bone');
insert_div_with_image('.model_under_garment', 'skull_cap_bone');
insert_div_with_image('.model_hat',           'skull_cap_bone');
insert_div_with_image('.model_slot_1',        'skull_cap_bone');
insert_div_with_image('.model_slot_2',        'skull_cap_bone');
insert_div_with_image('.model_background',    'skull_cap_bone');



//module.exports = {};
