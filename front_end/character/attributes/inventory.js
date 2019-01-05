'use strict';

// types:
// weopons
// food doing
// materials
// armour


const test_item = {
  name: 'meat',
  id: 1,
  rank: 0,
  cost: 100,
  description: 'rat meat',
  image_name: 'rat_meat',
};

class Inventory {
  constructor() {
    this.slots = [];
    this.maximum_slots = 4;
  }

  empty_slots() {
    this.slots = [];
  }

  randomise_slots() {
    this.slots = [];
  }

  spike_populate_inventory() {
    this.slots.push(test_item);
  }

  add_item(item) {

    this.slot.push(item);
  }

  drop_item() {

  }

}

module.exports = {
  Inventory,
};

