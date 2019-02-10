'use strict';

const app  = require('../engine/app');
const PIXI = require('pixi.js');

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

    visual_name: 'rusty knife',
    description:  'The rusty knife someone sharpened on what looks like a rock',
    image_name:  'rusty_knife',
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

    visual_name: 'old bow',
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

    visual_name: 'wrench blade',
    description: 'This blade looks to be a hastily sharped from an old wrench',
    image_name: 'wrench_blade',
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

    visual_name:  'pistol',
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

    visual_name:  'wrench blade',
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

    visual_name: 'util',
    description: 'some util thing',
    image_name: 'bunny',
  },

  //hat
  {
    name: 'old_helmet',
    position: 'hat',
    id: 100,
    rank: 0,
    cost: 20,

    visual_name: 'old helmet',
    description: 'A rusty old helmet that looks to be a WW2 replica',
    image_name: 'old_helmet',
  },

  //chest
  {
    name: 'old_clothes',
    id: 100,
    rank: 0,
    cost: 20,

    visual_name: 'torn clothes',
    description: 'torn clothes',
    image_name: 'old_clothes',
  },

  //feet
  {
    name: 'old_boots',
    id: 100,
    rank: 0,
    cost: 20,

    visual_name: 'old boots',
    description: 'A set of old boots, the bottom of them are worn and wont last long...',
    image_name: 'old_boots',
  },

  //slot
  {
    name: 'keys',
    id: 101,
    rank: 0,
    cost: 20,

    visual_name: 'keys',
    description: 'keys',
    image_name: 'bunny',
  },
  {
    name: 'ball',
    id: 102,
    rank: 0,
    cost: 20,

    visual_name: 'ball',
    description: 'ball',
    image_name: 'bunny',
  },

  //head
  {
    name: 'old_bandana',
    id: 100,
    rank: 0,
    cost: 20,

    visual_name: 'old bandana',
    description: 'An old shirt wrapped into a face mask',
    image_name: 'old_bandana',
  },

  //misc
  {
    name: 'meat',
    id: 1,
    rank: 0,
    cost: 20,
    type: 'food',

    visual_name: 'hunk of meat',
    description: 'rat meat',
    image_name: 'rat_meat',
  },
  {
    name: 'rat_hide',
    id: 2,
    rank: 0,
    cost: 80,
    type: 'material',

    visual_name: 'rat hide',
    description: 'the hide of a rat hide',
    image_name: 'rat_hide',
  },
  {
    name: 'rat_teeth',
    id: 3,
    rank: 0,
    cost: 40,
    type: 'material',

    visual_name: 'rat teeth',
    description: 'the teeth of a rat hide',
    image_name: 'rat_hide',
  },
  {
    name: 'rat_femur',
    id: 4,
    rank: 0,
    cost: 20,
    type: 'material',

    visual_name: 'rat femur',
    description: 'the femur of a rat',
    image_name: 'femur',
  },
  {
    name: 'skull_cap_bone',
    id:   5,
    rank: 0,
    cost: 10,
    type: 'material',

    visual_name: 'rat bone chip',
    description: 'a bone chip of a rat',
    image_name: 'skull_cap_bone',
  },
  {
    name: 'rat_leg_bone',
    id:   6,
    rank: 0,
    cost: 10,
    type: 'material',

    visual_name: 'rat leg bone',
    description: 'the leg bone of a rat',
    image_name: 'right_leg_bone',
  },

];

function get_random_items(max) {
  const number_of_items_to_return = generate_number_between_min_and_max(1, max|0);

  const item_array = [];

  for(let i = 0; i < number_of_items_to_return; i++) {
    item_array.push(items[Math.floor(Math.random()*items.length)]);
  }

  return item_array;
}

const get_item_by_name = name => items.find(item => item.name === name);

const get_item_by_id = id => items.find(item => item.id === id);

const extract_item_image_by_name = name => {
  const item = get_item_by_name(name);

  const image_name = item ? item.image_name: name;

  if(!image_name) {
    throw new Error('Can not find ' + name);
  }

  const found_sprite = PIXI.Sprite.fromFrame(image_name);
  const image_from_spritesheet = app.renderer.plugins.extract.image(found_sprite);

  return image_from_spritesheet;
};


const extract_image_by_item_object = item => {
  const found_sprite = PIXI.Sprite.fromFrame(item.image_name);

  const image_from_spritesheet = app.renderer.plugins.extract.image(found_sprite);

  return image_from_spritesheet;
};


module.exports = {
  get_item_by_name,
  get_item_by_id,
  get_random_items,
  extract_item_image_by_name,
  extract_image_by_item_object,
};

