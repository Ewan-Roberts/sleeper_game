'use strict';
const { Texture, sound } = require('pixi.js');
const { random_bound } = require('../../utils/math.js');

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
  Texture.fromFrame('bird_5'),
  Texture.fromFrame('bird_5'),
  Texture.fromFrame('bird_5'),
  Texture.fromFrame('bird_5'),
  Texture.fromFrame('bird_5'),
  Texture.fromFrame('bird_5'),
  Texture.fromFrame('bird_5'),
  Texture.fromFrame('bird_5'),
  Texture.fromFrame('bird_5'),
  Texture.fromFrame('bird_5'),
  Texture.fromFrame('bird_5'),
  Texture.fromFrame('bird_5'),
  Texture.fromFrame('bird_10'),
  Texture.fromFrame('bird_6'),
  Texture.fromFrame('bird_6'),
  Texture.fromFrame('bird_6'),
  Texture.fromFrame('bird_6'),
  Texture.fromFrame('bird_7'),
  Texture.fromFrame('bird_10'),
];

const dead = [ Texture.fromFrame('bird_8') ];

const frames = { move, wait, dead };

class Bird {
  constructor(sprite) {
    this.name = 'animation';

    this.sprite = sprite;
    this.fly_sound = sound.find('birds_fly_away');
    this.fly_sound.volume = 0.15;
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
    this.sprite.animationSpeed = 0.08;
    const random_start_frame = random_bound(0, 15);
    this.sprite.gotoAndPlay(random_start_frame);
    //this.sprite.loop = false;
  }

  move() {
    this.fly_sound.play();
    this.sprite.animationSpeed = 0.30;
    this.switch('move');
  }

  kill() {
    this.switch('dead');
  }
}

module.exports = {
  Bird,
};
