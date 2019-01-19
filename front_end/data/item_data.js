'use strict';

// types:
// food doing
// materials
// armour

const {
  generate_number_between_min_and_max,
} = require('../engine/math');

//https://www.uihere.com/free-graphics/search?q=knife

const weapon_list = [
  {
    name:       'rusty_knife',
    image_name: 'rusty_knife',
    id:         1001,
    rank:       0,
    cost:       50,
    type:       'weapon',
    damage:     1,
    speed:      1,
    condition:  100,

    display_name: 'rusty knife',
    description:  'The rusty knife someone sharpened on what looks like a rock',
  },
  {
    name:       'wrench_blade',
    image_name: 'wrench_blade',
    id:         1002,
    rank:       1,
    cost:       80,
    type:       'weapon',
    damage:     2,
    speed:      1,
    condition:  100,

    display_name: 'wrench blade',
    description:  'This blade looks to be a hastily sharped from an old wrench',
  },
];


const item_list = [
  {
    name: 'meat',
    id: 1,
    rank: 0,
    cost: 20,
    type: 'food',
    description: 'rat meat',
    image_name: 'rat_meat',
  },
  {
    name: 'rat hide',
    id: 2,
    rank: 0,
    cost: 80,
    type: 'material',
    description: 'the hide of a rat hide',
    image_name: 'rat_hide',
  },
  {
    name: 'rat teeth',
    id: 3,
    rank: 0,
    cost: 40,
    type: 'material',
    description: 'the teeth of a rat hide',
    image_name: 'rat_hide',
  },
  {
    name: 'rat femur',
    id: 4,
    rank: 0,
    cost: 20,
    type: 'material',
    description: 'the femur of a rat',
    image_name: 'femur',
  },
  {
    name: 'rat bone chip',
    id: 5,
    rank: 0,
    cost: 10,
    type: 'material',
    description: 'a bone chip of a rat',
    image_name: 'skull_cap_bone',
  },
  {
    name: 'rat leg bone',
    id: 6,
    rank: 0,
    cost: 10,
    type: 'material',
    description: 'the leg bone of a rat',
    image_name: 'right_leg_bone',
  },
];

function find_item_by_id(id) {
  return item_list.find(item => item.id === id);
}

function find_weapon_by_id(id) {
  return weapon_list.find(weapon => weapon.id === id);
}

function find_weapon_by_name(name) {
  return weapon_list.find(weapon => weapon.name === name);
}

function get_random_item_array() {
  const number_of_items_to_return = generate_number_between_min_and_max(1,3);

  const item_array = [];

  for(let i = 0; i < number_of_items_to_return; i++) {
    item_array.push(item_list[Math.floor(Math.random()*item_list.length)]);
  }

  return item_array;
}

module.exports = {
  find_item_by_id,
  get_random_item_array,
  find_weapon_by_id,
  find_weapon_by_name,
};

