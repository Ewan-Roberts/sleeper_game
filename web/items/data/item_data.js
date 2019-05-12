'use strict';

//https://www.uihere.com/free-graphics/search?q=knife
const items = [
  //primary
  {
    name:           'rusty_knife',
    animation_name: 'knife',
    id:             1,
    rank:           0,
    cost:           50,
    category:       'weapon',
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
    id:             2,
    rank:           99,
    cost:           999,
    category:       'weapon',
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
    id:             3,
    rank:           0,
    cost:           200,
    category:       'weapon',
    type:           'projectile',
    ammo:           'arrow',
    range:          200,
    damage:         40,
    speed:          400,
    condition:      100,

    visual_name:    'old bow',
    description:    'An old bow still working but not for long...',
    image_name:     'bow_00',
  },
  {
    name:           'weak_bow',
    animation_name: 'bow',
    id:             4,
    rank:           0,
    cost:           200,
    category:       'weapon',
    type:           'projectile',
    ammo:           'arrow',
    range:          200,
    damage:         1,
    speed:          400,
    condition:      100,

    visual_name:    'weak bow',
    description:    'A weak bow for testing',
    image_name:     'bunny',
  },

  {
    name:           'dev_bow',
    animation_name: 'bow',
    id:             5,
    rank:           99,
    cost:           999,
    category:       'weapon',
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
    id:          6,
    rank:        1,
    cost:        80,
    category:    'weapon',
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
    id:          7,
    rank:        1,
    cost:        80,
    category:    'weapon',
    range:       20,
    damage:      50,
    speed:       1,
    condition:   100,

    visual_name: 'wrench blade',
    description: 'This blade looks to be a hastily sharped from an old wrench',
    image_name:  'wrench_blade',
  },

  //secondary
  {
    name:        'pistol',
    id:          8,
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
    id:           9,
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
    id: 10,
    rank: 0,
    cost: 20,
    category: 'armour',

    visual_name: 'util',
    description: 'some util thing',
    image_name: 'bunny',
  },

  //hat
  {
    name: 'old_helmet',
    position: 'hat',
    id: 11,
    rank: 0,
    cost: 20,
    category: 'armour',

    visual_name: 'old helmet',
    description: 'A rusty old helmet that looks a WW2 replica',
    image_name: 'old_helmet',
  },

  //chest
  {
    name: 'old_clothes',
    id: 12,
    rank: 0,
    cost: 20,
    category: 'armour',

    visual_name: 'torn clothes',
    description: 'torn clothes',
    image_name: 'old_clothes',
  },

  //feet
  {
    name: 'old_boots',
    id: 13,
    rank: 0,
    cost: 20,
    category: 'armour',

    visual_name: 'old boots',
    description: 'A set of old boots, the bottom of them are worn and wont last long...',
    image_name: 'old_boots',
  },

  //slot
  {
    name: 'keys',
    id: 14,
    rank: 0,
    cost: 20,
    category: 'material',

    visual_name: 'keys',
    description: 'keys',
    image_name: 'bunny',
  },
  {
    name: 'ball',
    id: 15,
    rank: 0,
    cost: 20,
    category: 'material',

    visual_name: 'ball',
    description: 'ball',
    image_name: 'bunny',
  },

  //head
  {
    name: 'old_bandana',
    id: 16,
    rank: 0,
    cost: 20,
    category: 'armour',

    visual_name: 'old bandana',
    description: 'An old shirt wrapped into a face mask',
    image_name: 'old_bandana',
  },

  //misc
  {
    name: 'meat',
    id: 17,
    rank: 0,
    cost: 20,
    category: 'food',

    visual_name: 'hunk of meat',
    description: 'rat meat',
    image_name: 'rat_meat',
  },
  {
    name: 'blood',
    id: 18,
    rank: 0,
    cost: 10,
    category: 'fuel',

    visual_name: 'blood',
    description: 'the fuel for the cooker',
    image_name: 'blood_vial',
  },

  {
    name: 'rat_hide',
    id: 19,
    rank: 0,
    cost: 80,
    category: 'material',

    visual_name: 'rat hide',
    description: 'the hide of a rat hide',
    image_name: 'rat_hide',
  },
  {
    name: 'rat_teeth',
    id: 20,
    rank: 0,
    cost: 40,
    category: 'material',

    visual_name: 'rat teeth',
    description: 'the teeth of a rat hide',
    image_name: 'rat_hide',
  },
  {
    name: 'rat_femur',
    id: 21,
    rank: 0,
    cost: 20,
    category: 'material',

    visual_name: 'rat femur',
    description: 'the femur of a rat',
    image_name: 'femur',
  },
  {
    name: 'rag',
    id: 22,
    rank: 0,
    cost: 10,
    category: 'material',

    visual_name: 'a rag',
    description: 'an old rag',
    image_name: 'dirty_rag_1',
  },
  {
    name: 'oil_can',
    id: 23,
    rank: 0,
    cost: 10,
    category: 'material',

    visual_name: 'a small oil can',
    description: 'an oil can',
    image_name: 'bunny',
  },
  {
    name: 'arrow',
    id:   24,
    rank: 0,
    cost: 15,
    category: 'ammo',

    visual_name: 'used arrow',
    description: 'Theres some dry blood on the tip...',
    image_name: 'flying_arrow',
  },
  {
    name: 'skull_cap_bone',
    id:   25,
    rank: 0,
    cost: 10,
    category: 'material',

    visual_name: 'rat bone chip',
    description: 'a bone chip of a rat',
    image_name: 'skull_cap_bone',
  },
  {
    name: 'rat_leg_bone',
    id:   26,
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

