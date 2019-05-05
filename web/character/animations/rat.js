'use strict';
const { Texture, extras } = require('pixi.js');

const { radian } = require('../../utils/math');

//TODO move to dragon
class rat_animations {
  static move_frames() {
    const moving_frames = [];

    for (let i = 2; i < 15; i++) {
      moving_frames.push(Texture.fromFrame(`rat_${i}`));
    }

    for (let i = 15; i > 1; i--) {
      moving_frames.push(Texture.fromFrame(`rat_${i}`));
    }

    moving_frames.push(Texture.fromFrame('rat_48'));
    moving_frames.push(Texture.fromFrame('rat_49'));
    moving_frames.push(Texture.fromFrame('rat_50'));
    moving_frames.push(Texture.fromFrame('rat_49'));
    moving_frames.push(Texture.fromFrame('rat_48'));

    return moving_frames;
  }

  static wait_frames() {
    const waiting_frames = [
      Texture.fromFrame('rat_36'),
      Texture.fromFrame('rat_37'),
      Texture.fromFrame('rat_38'),
      Texture.fromFrame('rat_51'),
      Texture.fromFrame('rat_37'),
      Texture.fromFrame('rat_36'),
    ];

    return waiting_frames;
  }

  static dead_frames() {
    return [ Texture.fromFrame('rat_35') ];
  }

  static eat_frames() {
    const eating_frames = [
      Texture.fromFrame('rat_37'),
      Texture.fromFrame('rat_38'),
      Texture.fromFrame('rat_39'),
      Texture.fromFrame('rat_40'),
      Texture.fromFrame('rat_39'),
      Texture.fromFrame('rat_40'),
      Texture.fromFrame('rat_41'),
      Texture.fromFrame('rat_40'),
      Texture.fromFrame('rat_39'),
      Texture.fromFrame('rat_38'),
      Texture.fromFrame('rat_37'),
      Texture.fromFrame('rat_36'),
    ];

    return eating_frames;
  }
}

const frames = {
  move: rat_animations.move_frames(),
  wait: rat_animations.wait_frames(),
  dead: rat_animations.dead_frames(),
  eat:  rat_animations.eat_frames(),
};

class Rodent {
  constructor(entity) {
    this.name = 'animation';

    const texture = [Texture.fromFrame('bunny')];
    //TODO Finish migrating animation
    entity.sprite = new extras.AnimatedSprite(texture);
    this.sprite = entity.sprite;
    this.sprite.anchor.set(0.5);
    this.sprite.rotation_offset = 1.57;
  }

  switch(action) {
    if (this.state === action) return;

    this.sprite.textures = frames[action];
    this.sprite.loop = true;
    this.sprite.play();
    this.state = action;
  }

  face_point(point) {
    this.sprite.rotation = radian(point, this.sprite);
  }

  attack() {
    this.switch('eat');
  }

  walk() {
    this.switch('move');
  }

  kill() {
    this.switch('dead');
  }

}

module.exports = {
  Rodent,
};
