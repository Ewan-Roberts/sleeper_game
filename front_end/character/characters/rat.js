'use strict';

const PIXI = require('pixi.js');
const viewport = require('../../engine/viewport');
const rat_animations = require('../animations/rat');
const { move_sprite_to_point } = require('../../engine/pathfind');

class Rat {
  constructor() {

    this.animations = rat_animations;

    this.sprite = new PIXI.extras.AnimatedSprite(this.animations.move);
    this.sprite.anchor.set(0.5);
    this.sprite.animationSpeed = 0.4;
    this.sprite.rotation = -0.5;
    this.sprite.play();
    this.sprite.name = 'rat';
    this.sprite.zIndex = -3;

    viewport.getChildByName('critter_container').addChild(this.sprite);
  }

  create_patrol_path(path_data) {
    this.sprite.patrol_path = path_data;
  }

  set_position(point) {
    this.sprite.position.set(point.x, point.y);
  }

  move_to_point(point) {
    move_sprite_to_point(this.sprite, {
      middle: {
        x: point.x,
        y: point.y,
      },
    });
  }

}

module.exports = {
  Rat,
};
