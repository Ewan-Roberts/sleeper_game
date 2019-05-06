'use strict';
const { pathfind } = require('../../engine/pathfind.js');

class Scavenge {
  constructor({ sprite, pathfind, tween, loot }) {
    this.name     = 'scavenge';
    this.sprite   = sprite;
    this.pathfind = pathfind;
    this.tween    = tween;
    this.loot     = loot;
  }

  load_pool(item_pool) {
    this.pool = item_pool;
  }

  for_item() {
    const { first } = this.pool;

    this.pathfind.go_to_sprite(first.sprite);
  }

  async get_new_path() {
    this.tween.chain();
    // const item_closest = this.pool.closest_item_to(this.sprite);
    const { first } = this.pool;
    this.target_item = first;

    try {
      this.path = await pathfind.get_sprite_to_sprite_path(this.sprite, first.sprite);
    } catch (error) {
      console.log(error);
    }
  }

  go_to_item() {
    return new Promise(resolve => {
      this.tween.add_path(this.path);
      this.tween.time = 3000;
      this.tween.movement.on('end', () => {
        this.loot.take_items(this.target_item.loot.items);

        resolve();
      });

      this.tween.start();
    });
  }

  async path_to_item() {
    this.tween.chain();

    const { first } = this.pool;

    const path_to_item = await pathfind.get_sprite_to_sprite_path(this.sprite, first.sprite);
    this.tween.path_smoothness = 100;
    this.tween.add_path(path_to_item);
    this.tween.time = 3000;
    this.tween.draw_path();
    this.tween.start();

    this.tween.movement.on('end', () => {
      this.loot.take_items(first.loot.items);
    });
  }
}

module.exports = {
  Scavenge,
};
