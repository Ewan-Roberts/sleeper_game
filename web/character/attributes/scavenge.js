'use strict';

class Scavenge {
  constructor({ sprite, pathfind }) {
    this.name     = 'scavenge';
    this.sprite   = sprite;
    this.pathfind = pathfind;
  }

  load_pool(item_pool) {
    this.pool = item_pool;
  }

  for_item() {
    const { first } = this.pool;

    this.pathfind.go_to_sprite(first.sprite);

    console.log(this);
  }
}

module.exports = {
  Scavenge,
};
