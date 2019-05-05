'use strict';
const PIXI = require('pixi.js');

const { radian } = require('../../utils/math');

class bird_animations {
  static move_frames() {
    const moving_frames = [];

    moving_frames.push(PIXI.Texture.fromFrame('bird_0'));
    moving_frames.push(PIXI.Texture.fromFrame('bird_1'));
    moving_frames.push(PIXI.Texture.fromFrame('bird_2'));
    moving_frames.push(PIXI.Texture.fromFrame('bird_3'));
    moving_frames.push(PIXI.Texture.fromFrame('bird_9'));
    moving_frames.push(PIXI.Texture.fromFrame('bird_10'));
    moving_frames.push(PIXI.Texture.fromFrame('bird_5'));
    moving_frames.push(PIXI.Texture.fromFrame('bird_6'));
    moving_frames.push(PIXI.Texture.fromFrame('bird_5'));
    moving_frames.push(PIXI.Texture.fromFrame('bird_10'));
    moving_frames.push(PIXI.Texture.fromFrame('bird_9'));

    moving_frames.push(PIXI.Texture.fromFrame('bird_3'));
    moving_frames.push(PIXI.Texture.fromFrame('bird_2'));
    moving_frames.push(PIXI.Texture.fromFrame('bird_1'));
    moving_frames.push(PIXI.Texture.fromFrame('bird_0'));
    moving_frames.push(PIXI.Texture.fromFrame('bird_1'));
    moving_frames.push(PIXI.Texture.fromFrame('bird_2'));
    moving_frames.push(PIXI.Texture.fromFrame('bird_3'));
    moving_frames.push(PIXI.Texture.fromFrame('bird_4'));
    moving_frames.push(PIXI.Texture.fromFrame('bird_4'));
    moving_frames.push(PIXI.Texture.fromFrame('bird_4'));
    moving_frames.push(PIXI.Texture.fromFrame('bird_4'));
    moving_frames.push(PIXI.Texture.fromFrame('bird_4'));
    moving_frames.push(PIXI.Texture.fromFrame('bird_4'));
    moving_frames.push(PIXI.Texture.fromFrame('bird_4'));
    moving_frames.push(PIXI.Texture.fromFrame('bird_4'));
    moving_frames.push(PIXI.Texture.fromFrame('bird_4'));
    moving_frames.push(PIXI.Texture.fromFrame('bird_4'));
    moving_frames.push(PIXI.Texture.fromFrame('bird_4'));
    moving_frames.push(PIXI.Texture.fromFrame('bird_4'));
    moving_frames.push(PIXI.Texture.fromFrame('bird_3'));

    moving_frames.push(PIXI.Texture.fromFrame('bird_9'));
    moving_frames.push(PIXI.Texture.fromFrame('bird_10'));
    moving_frames.push(PIXI.Texture.fromFrame('bird_5'));
    moving_frames.push(PIXI.Texture.fromFrame('bird_6'));
    moving_frames.push(PIXI.Texture.fromFrame('bird_5'));
    moving_frames.push(PIXI.Texture.fromFrame('bird_10'));
    moving_frames.push(PIXI.Texture.fromFrame('bird_9'));
    moving_frames.push(PIXI.Texture.fromFrame('bird_3'));
    moving_frames.push(PIXI.Texture.fromFrame('bird_2'));
    moving_frames.push(PIXI.Texture.fromFrame('bird_1'));
    moving_frames.push(PIXI.Texture.fromFrame('bird_0'));

    return moving_frames;
  }

  static wait_frames() {
    const waiting_frames = [
      PIXI.Texture.fromFrame('bird_5'),
      PIXI.Texture.fromFrame('bird_6'),
      PIXI.Texture.fromFrame('bird_6'),
      PIXI.Texture.fromFrame('bird_6'),
      PIXI.Texture.fromFrame('bird_6'),
      PIXI.Texture.fromFrame('bird_7'),
    ];

    return waiting_frames;
  }

  static dead_frames() {
    return [ PIXI.Texture.fromFrame('bird_8') ];
  }
}

const frames = {
  move: bird_animations.move_frames(),
  wait: bird_animations.wait_frames(),
  dead: bird_animations.dead_frames(),
};

class Bird {
  constructor(entity) {
    this.name = 'animation';

    entity.sprite = new PIXI.extras.AnimatedSprite(frames.move);

    this.sprite = entity.sprite;
    this.sprite.width  /=2;
    this.sprite.height /=2;
    this.sprite.anchor.set(0.5);
    this.sprite.rotation = 1;
    this.sprite.animationSpeed = 0.19;
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

  wait() {
    this.switch('wait');
  }

  move() {
    this.switch('move');
  }

  kill() {
    this.switch('dead');
  }

}

module.exports = {
  Bird,
};
