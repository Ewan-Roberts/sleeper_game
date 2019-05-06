'use strict';
const { Sprite, tweenManager } = require('pixi.js');

const { pathfind } = require('../../engine/pathfind.js');
const { items    } = require('../../engine/pixi_containers');

class Pathfind {
  constructor(sprite) {
    this.name = 'pathfind';

    this.sprite = sprite;
    //TODO create utils containter for level anshor points
    this.anchor_sprite = new Sprite.fromFrame('bunny');
    this.anchor_sprite.alpha = 1;

    items.addChild(this.anchor_sprite);
  }

  go_to_sprite(sprite) {
    pathfind.move_sprite_to_sprite_on_grid(this.sprite, sprite);
  }

  go_to_point(point) {
    this.anchor_sprite.position.copy(point);

    pathfind.move_sprite_to_sprite_on_grid(this.sprite, this.anchor_sprite);
  }

  hightlight_grid_around() {
    pathfind.grid_around_sprite(this.sprite);
  }

  stop() {
    const tweens = tweenManager.getTweensForTarget(this.sprite);

    tweens.forEach(tween => tween.stop());
  }
}

module.exports = {
  Pathfind,
};
