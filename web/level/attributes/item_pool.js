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

  closest_to_sprite(sprite){
    const item_list = [...this.items];

    const closests_item = item_list.reduce((a,b) =>
      distance_between(sprite, a.sprite) <
      distance_between(sprite, b.sprite) ?
        a : b
    );

    return closests_item;
  }

  closest_item_to(sprite) {
    return this.items.reduce((a,b) =>
      distance_between(sprite, a.sprite) <
      distance_between(sprite, b.sprite) ?
        a : b
    );
  }

  sortest_by_distance_to(sprite) {
    this.items.sort((a,b) =>
      distance_between(sprite, a.sprite) -
      distance_between(sprite, b.sprite)
    );
  }

}

module.exports = {
  Item_Pool,
};
