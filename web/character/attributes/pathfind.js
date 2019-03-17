'use strict';
const PIXI = require('pixi.js');

const { pathfind_sprite } = require('../../engine/pathfind.js');
const { item_container } = require('../../engine/pixi_containers');

class Pathfind {
  constructor(sprite) {
    this.name = 'pathfind';

    this.sprite = sprite;
    //TODO create utils containter for level anshor points
    this.anchor_sprite = new PIXI.Sprite.fromFrame('bunny');
    this.anchor_sprite.alpha = 0;

    item_container.addChild(this.anchor_sprite);
  }

  go_to_sprite(sprite) {
    pathfind_sprite.move_sprite_to_sprite_on_grid(this.sprite, sprite);
  }

  go_to_point(point) {
    this.anchor_sprite.position.copy(point);

    const global_point = this.anchor_sprite.getGlobalPosition();

    pathfind_sprite.move_sprite_to_point_on_grid(this.sprite, global_point);
  }

  stop() {
    const tweens = PIXI.tweenManager.getTweensForTarget(this.sprite);

    tweens.forEach(tween => tween.stop());
  }
}

module.exports = {
  Pathfind,
};
