'use strict';

const { Item } = require('./item_model');

class Campfire extends Item {
  constructor() {
    super('campfire');

    this.state = 'closed';
    this.placed = false;
  }
}

module.exports = {
  Campfire,
};
