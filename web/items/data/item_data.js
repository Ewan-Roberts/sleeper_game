'use strict';

//https://www.uihere.com/free-graphics/search?q=knife
const items = [
  //primary
  {
    name:           'rusty_knife',
    animation_name: 'knife',
    id:             1001,
    rank:           0,
    cost:           50,
    category:       'primary',
    range:          20,
    damage:         10,
    speed:          400,
    condition:      100,

    visual_name:    'rusty knife',
    description:    'The rusty knife someone sharpened on what looks like a rock',
    image_name:     'rusty_knife',
  },
  {
    name:           'dev_knife',
    animation_name: 'knife',
    id:             1009,
    rank:           99,
    cost:           999,
    category:       'primary',
    range:          20,
    damage:         999,
    speed:          100,
    condition:      999,

    visual_name:    'rusty knife',
    description:    'You call that a knife???',
    image_name:     'rusty_knife',
  },
  {
    name:           'old_bow',
    animation_name: 'bow',
    id:             1002,
    rank:           0,
    cost:           200,
    category:       'primary',
    type:           'projectile',
    ammo:           'arrow',
    range:          200,
    damage:         40,
    speed:          400,
    condition:      100,

    visual_name:    'old bow',
    description:    'An old bow still working but not for long...',
    image_name:     'bunny',
  },
  {
    name:           'dev_bow',
    animation_name: 'bow',
    id:             1003,
    rank:           99,
    cost:           999,
    category:       'primary',
    type:           'projectile',
    ammo:           'arrow',
    range:          999,
    damage:         999,
    speed:          100,
    condition:      999,

    visual_name:    'old bow',
    description:    'this is my dev bow, there are many like it but this one kills',
    image_name:     'bunny',
  },
  {
    name:        'rat_teeth',
    id:          1004,
    rank:        1,
    cost:        80,
    category:    'primary',
    range:       20,
    damage:      20,
    speed:       10,
    condition:   100,

    visual_name: 'rat teeth',
    description: 'the gnashing teeth of a diseased rat',
    image_name:  'bunny',
  },

  {
    name:        'wrench_blade',
    id:          1002,
    rank:        1,
    cost:        80,
    category:    'primary',
    range:       20,
    damage:      2,
    speed:       1,
    condition:   100,

    visual_name: 'wrench blade',
    description: 'This blade looks to be a hastily sharped from an old wrench',
    image_name:  'wrench_blade',
  },

  //secondary
  {
    name:        'pistol',
    id:          1004,
    rank:        0,
    cost:        50,
    category:    'weapon',
    range:       20,
    damage:      10,
    speed:       400,
    condition:   100,

    visual_name: 'pistol',
    description: 'a pistol from a cop',
    image_name:  'bunny',
  },

  //melee
  {
    name:         'wrench_blade',
    id:           1002,
    rank:         1,
    cost:         80,
    category:     'weapon',
    range:        20,
    damage:       2,
    speed:        1,
    condition:    100,

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
    category: 'food',

    visual_name: 'hunk of meat',
    description: 'rat meat',
    image_name: 'rat_meat',
  },
  {
    name: 'rat_hide',
    id: 2,
    rank: 0,
    cost: 80,
    category: 'material',

    visual_name: 'rat hide',
    description: 'the hide of a rat hide',
    image_name: 'rat_hide',
  },
  {
    name: 'rat_teeth',
    id: 3,
    rank: 0,
    cost: 40,
    category: 'material',

    visual_name: 'rat teeth',
    description: 'the teeth of a rat hide',
    image_name: 'rat_hide',
  },
  {
    name: 'rat_femur',
    id: 4,
    rank: 0,
    cost: 20,
    category: 'material',

    visual_name: 'rat femur',
    description: 'the femur of a rat',
    image_name: 'femur',
  },
  {
    name: 'skull_cap_bone',
    id:   5,
    rank: 0,
    cost: 10,
    category: 'material',

    visual_name: 'rat bone chip',
    description: 'a bone chip of a rat',
    image_name: 'skull_cap_bone',
  },
  {
    name: 'rat_leg_bone',
    id:   6,
    rank: 0,
    cost: 10,
    category: 'material',

    visual_name: 'rat leg bone',
    description: 'the leg bone of a rat',
    image_name: 'right_leg_bone',
  },
];

module.exports = {
  items,
};

