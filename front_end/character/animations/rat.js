
'use strict';

const PIXI = require('pixi.js');

class rat_animations {

  static move_frames() {
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

  static wait_frames() {

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

  static dead_frames() {
    return PIXI.Texture.fromFrame('rat_35');
  }

  static eat_frames() {

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
      PIXI.Texture.fromFrame('rat_36'),
      PIXI.Texture.fromFrame('rat_01'),
    ];

    return eating_frames;
  }
}

module.exports = {
  move: rat_animations.move_frames(),
  wait: rat_animations.wait_frames(),
  dead: rat_animations.dead_frames(),
  eat: rat_animations.eat_frames(),
};

