'use strict';
const { radian } = require('../../utils/math');

class Animation{
  constructor(sprite, frames) {
    this.name = 'animation';

    this.sprite = sprite;
    this.frames = frames;
  }

  switch(action) {
    if (this.state === action) return;

    this.sprite.textures = this.frames[action];
    this.sprite.play();
    this.state = action;
  }

  face_point(point) {
    this.sprite.rotation = radian(point, this.sprite);
  }

  wait()   { this.switch('idle'); }
  idle()   { this.switch('idle'); }
  eat()    { this.switch('eat');  }
  move()   { this.switch('move'); }
  walk()   { this.switch('move'); }
  attack() { this.switch('attack'); }

  kill() {
    this.switch('death');
    this.sprite.loop = false;
  }
}

module.exports = {
  Animation,
};
