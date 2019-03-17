'use strict';

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
}

module.exports = {
  Item_Pool,
};
