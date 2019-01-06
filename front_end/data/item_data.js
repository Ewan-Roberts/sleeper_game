'use strict';

const item_list = [
  {
    name: 'meat',
    id: 1,
    rank: 0,
    cost: 20,
    description: 'rat meat',
    image_name: 'rat_meat',
  },
  {
    name: 'rat hide',
    id: 2,
    rank: 0,
    cost: 80,
    description: 'thie hide of a rat hide',
    image_name: 'rat_hide',
  },
];

function find_item_by_id(id) {
  return item_list.find(item => item.id === id);
}

module.exports = {
  find_item_by_id,
};

