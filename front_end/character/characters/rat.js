'use strict';

const PIXI = require('pixi.js');
const viewport = require('../../engine/viewport');


class Rat {
  constructor() {

    this.animations = {
      move: this.create_move_frames(),
      wait: this.create_wait_frames(),
      dead: this.create_dead_frames(),
      eat:  this.create_eat_frames(),
    };

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


  create_move_frames() {
    const moving_frames = [];

    for (let i = 1; i < 15; i += 1) {
      const val = i < 10 ? `0${i}` : i;
      moving_frames.push(PIXI.Texture.fromFrame(`rat_${val}`));
    }

    for (let i = 15; i > 0; i -= 1) {
      const val = i < 10 ? `0${i}` : i;
      moving_frames.push(PIXI.Texture.fromFrame(`rat_${val}`));
    }

    moving_frames.push(PIXI.Texture.fromFrame('rat_48'));
    moving_frames.push(PIXI.Texture.fromFrame('rat_49'));
    moving_frames.push(PIXI.Texture.fromFrame('rat_50'));
    moving_frames.push(PIXI.Texture.fromFrame('rat_49'));
    moving_frames.push(PIXI.Texture.fromFrame('rat_48'));

    return moving_frames;
  }

  create_wait_frames() {

    const waiting_frames = [
      PIXI.Texture.fromFrame('rat_36'),
      PIXI.Texture.fromFrame('rat_37'),
      PIXI.Texture.fromFrame('rat_38'),
      PIXI.Texture.fromFrame('rat_51'),
      PIXI.Texture.fromFrame('rat_37'),
      PIXI.Texture.fromFrame('rat_36'),
      PIXI.Texture.fromFrame('rat_01'),
    ];

    return waiting_frames;
  }

  create_dead_frames() {
    return PIXI.Texture.fromFrame('rat_35');
  }

  create_eat_frames() {

    const eating_frames = [
      PIXI.Texture.fromFrame('rat_37'),
      PIXI.Texture.fromFrame('rat_38'),
      PIXI.Texture.fromFrame('rat_39'),
      PIXI.Texture.fromFrame('rat_40'),
      PIXI.Texture.fromFrame('rat_39'),
      PIXI.Texture.fromFrame('rat_40'),
      PIXI.Texture.fromFrame('rat_41'),
      PIXI.Texture.fromFrame('rat_40'),
      PIXI.Texture.fromFrame('rat_39'),
      PIXI.Texture.fromFrame('rat_38'),
      PIXI.Texture.fromFrame('rat_37'),
    ];

    return eating_frames;
  }
}

module.exports = {
  Rat,
};
