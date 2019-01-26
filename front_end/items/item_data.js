'use strict';

const app  = require('../engine/app');
const PIXI = require('pixi.js');
// types:
// food doing
// materials
// armour

const {
  generate_number_between_min_and_max,
} = require('../engine/math');

//https://www.uihere.com/free-graphics/search?q=knife

const items = [
  //primary
  {
    name:       'rusty_knife',
    id:         1001,
    rank:       0,
    cost:       50,
    type:       'primary',
    range:      20,
    damage:     10,
    speed:      400,
    condition:  100,

    display_name: 'rusty knife',
    description:  'The rusty knife someone sharpened on what looks like a rock',

    image_name: 'rusty_knife',
  },
  {
    name:       'old_bow',
    id:         1002,
    rank:       0,
    cost:       200,
    type:       'primary',
    range:      200,
    damage:     10,
    speed:      400,
    condition:  100,

    display_name: 'old bow',
    description:  'An old bow still working but not for long...',

    image_name: 'bunny',
  },
  {
    name:       'wrench_blade',
    id:         1002,
    rank:       1,
    cost:       80,
    type:       'primary',
    range:      20,
    damage:     2,
    speed:      1,
    condition:  100,

    display_name: 'wrench blade',
    description:  'This blade looks to be a hastily sharped from an old wrench',

    image_name: 'bunny',
  },

  //secondary
  {
    name:       'pistol',
    id:         1004,
    rank:       0,
    cost:       50,
    type:       'weapon',
    range:      20,
    damage:     10,
    speed:      400,
    condition:  100,

    display_name: 'a pistol',
    description:  'a pistol from a cop',

    image_name: 'bunny',
  },

  //melee
  {
    name:       'wrench_blade',
    id:         1002,
    rank:       1,
    cost:       80,
    type:       'weapon',
    range:      20,
    damage:     2,
    speed:      1,
    condition:  100,

    display_name: 'wrench blade',
    description:  'This blade looks to be a hastily sharped from an old wrench',

    image_name: 'bunny',
  },

  //util
  {
    name: 'util',
    id: 105,
    rank: 0,
    cost: 20,

    description: 'some util thing',
    image_name: 'bunny',
  },

  //head
  {
    name: 'sunglasses',
    id: 100,
    rank: 0,
    cost: 20,

    description: 'a sunglasses',
    image_name: 'bunny',
  },

  //chest
  {
    name: 'torn_clothes',
    id: 100,
    rank: 0,
    cost: 20,

    description: 'torn clothes',
    image_name: 'bunny',
  },

  //feet
  {
    name: 'army_boots',
    id: 100,
    rank: 0,
    cost: 20,

    description: 'army boots',
    image_name: 'bunny',
  },

  //slot
  {
    name: 'keys',
    id: 101,
    rank: 0,
    cost: 20,

    description: 'keys',
    image_name: 'bunny',
  },
  {
    name: 'ball',
    id: 102,
    rank: 0,
    cost: 20,

    description: 'ball',
    image_name: 'bunny',
  },

  //hat
  {
    name: 'bandana',
    position: 'head',
    id: 100,
    rank: 0,
    cost: 20,

    description: 'a bandana',
    image_name: 'bunny',
  },

  //misc
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

function get_random_items() {
  const number_of_items_to_return = generate_number_between_min_and_max(1,3);

  const item_array = [];

  for(let i = 0; i < number_of_items_to_return; i++) {
    item_array.push(items[Math.floor(Math.random()*items.length)]);
  }

  return item_array;
}

const get_item_by_name = name => items.find(item => item.image_name === name);

const get_item_by_id = id => items.find(item => item.id === id);

const extract_item_image_by_name = name => {
  const { image_name } = get_item_by_name(name);

  const texture = PIXI.Sprite.fromFrame(image_name);

  return app.renderer.plugins.extract.image(texture);
};

module.exports = {
  get_item_by_name,
  get_item_by_id,
  get_random_items,
  extract_item_image_by_name,
};

