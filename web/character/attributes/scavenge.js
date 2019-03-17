'use strict';

const { pathfind_sprite } = require('../../engine/pathfind.js');

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

    console.log(this);
  }

  async get_new_path() {
    const { first } = this.pool;

    this.path = await pathfind_sprite.get_sprite_to_sprite_path(this.sprite, first.sprite);

    this.tween.chain();
  }

  go_to_item() {
    return new Promise(resolve => {
      this.tween.add_tile_path(this.path);
      this.tween.time = 3000;
      this.tween.movement.on('end', ()=> resolve('poo'));
      this.tween.start();
    });
  }


  async path_to_item() {
    this.tween.chain();

    const { first } = this.pool;

    const path_to_item = await pathfind_sprite.get_sprite_to_sprite_path(this.sprite, first.sprite);
    this.tween.path_smoothness = 100;
    this.tween.add_tile_path(path_to_item);
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
