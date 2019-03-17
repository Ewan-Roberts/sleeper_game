'use strict';

const { distance_between } = require('../../utils/math');

class Item_Pool {
  constructor() {
    this.items = [];
  }

  load(item) {
    this.items.push(item);
  }

  get first() {
    const [item] = this.items;

    this.items.shift();

    return item;
  }

  closest_item_to(sprite) {
    return this.items.reduce((a,b) =>
      distance_between(sprite, a.sprite) <
      distance_between(sprite, b.sprite) ?
        a : b
    );
  }
}

module.exports = {
  Item_Pool,
};
