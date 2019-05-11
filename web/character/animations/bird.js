'use strict';
const { Texture, extras } = require('pixi.js');

const { radian } = require('../../utils/math');

const move = [
  Texture.fromFrame('bird_0'),
  Texture.fromFrame('bird_1'),
  Texture.fromFrame('bird_2'),
  Texture.fromFrame('bird_3'),
  Texture.fromFrame('bird_9'),
  Texture.fromFrame('bird_10'),
  Texture.fromFrame('bird_5'),
  Texture.fromFrame('bird_6'),
  Texture.fromFrame('bird_5'),
  Texture.fromFrame('bird_10'),
  Texture.fromFrame('bird_9'),

  Texture.fromFrame('bird_3'),
  Texture.fromFrame('bird_2'),
  Texture.fromFrame('bird_1'),
  Texture.fromFrame('bird_0'),
  Texture.fromFrame('bird_1'),
  Texture.fromFrame('bird_2'),
  Texture.fromFrame('bird_3'),
  Texture.fromFrame('bird_4'),
  Texture.fromFrame('bird_4'),
  Texture.fromFrame('bird_4'),
  Texture.fromFrame('bird_4'),
  Texture.fromFrame('bird_4'),
  Texture.fromFrame('bird_4'),
  Texture.fromFrame('bird_4'),
  Texture.fromFrame('bird_4'),
  Texture.fromFrame('bird_4'),
  Texture.fromFrame('bird_4'),
  Texture.fromFrame('bird_4'),
  Texture.fromFrame('bird_4'),
  Texture.fromFrame('bird_3'),

  Texture.fromFrame('bird_9'),
  Texture.fromFrame('bird_10'),
  Texture.fromFrame('bird_5'),
  Texture.fromFrame('bird_6'),
  Texture.fromFrame('bird_5'),
  Texture.fromFrame('bird_10'),
  Texture.fromFrame('bird_9'),
  Texture.fromFrame('bird_3'),
  Texture.fromFrame('bird_2'),
  Texture.fromFrame('bird_1'),
  Texture.fromFrame('bird_0'),
];

const wait = [
  Texture.fromFrame('bird_5'),
  Texture.fromFrame('bird_6'),
  Texture.fromFrame('bird_6'),
  Texture.fromFrame('bird_6'),
  Texture.fromFrame('bird_6'),
  Texture.fromFrame('bird_7'),
];

const dead = [ Texture.fromFrame('bird_8') ];

const frames = { move, wait, dead };

class Bird {
  constructor(entity) {
    this.name = 'animation';

    entity.sprite = new extras.AnimatedSprite(frames.move);

    this.sprite = entity.sprite;
    this.sprite.width  /=2;
    this.sprite.height /=2;
    this.sprite.anchor.set(0.5);
    this.sprite.rotation = 1;
    this.sprite.animationSpeed = 0.19;
    // IMPORTANT FOR ARROWS MANAGER
    this.sprite.id = entity.id;
    this.sprite.play();
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
