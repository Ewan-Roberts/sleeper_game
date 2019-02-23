'use strict';

const PIXI = require('pixi.js');

const { pathfind_sprite } = require('../../engine/pathfind.js');

class Pathfind {
  constructor(sprite) {
    this.name = 'pathfind';

    this.sprite = sprite;
  }

  go_to_sprite(sprite) {
    pathfind_sprite.move_sprite_to_sprite_on_grid(this.sprite, sprite);
  }

  stop() {
    const tweens = PIXI.tweenManager.getTweensForTarget(this.sprite);

    tweens.forEach(tween => tween.stop());
  }
}

module.exports = {
  Pathfind,
};
