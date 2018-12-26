'use strict';

class Inventory {
  constructor(attributes) {
    this.id = attributes.id;
    this.items= attributes.items;
  }

}


async function get_player_inventory_on_id() {
  return({
    items: [
      {
        name: 'bunny',
        item_id: 'an id',
        slot: 0,
      },
      {
        name: 'bunny',
        item_id: 'an id',
        slot: 1,
      },
      {
        name: 'bunny',
        item_id: 'an id',
        slot: 2,
      },
      {
        name: 'bunny',
        item_id: 'an id',
        slot: 3,
      },
    ],
  });
}

async function register_user() {
  return 1;
}


module.exports = {
  get_player_inventory_on_id,
  register_user,
};
