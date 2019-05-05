'use strict';
const PIXI = require('pixi.js');

const { radian } = require('../../utils/math');


class zombie_animations {
  static move_frames() {
    const frames = [];
    for (let i = 0; i <= 31; i++) {
      const name = (i<10)?`walk000${i}`:`walk00${i}`;

      frames.push(PIXI.Texture.fromFrame(name));
    }

    return frames;
  }
}

const frames = {
  move: zombie_animations.move_frames(),
};


class Zombie {
  constructor(entity) {
    this.name = 'animation';

    entity.sprite = new PIXI.extras.AnimatedSprite(frames.move);

    this.sprite = entity.sprite;
    this.sprite.width  /=2;
    this.sprite.height /=2;
    this.sprite.anchor.set(0.5);
    this.sprite.rotation = -0.7;
    this.sprite.animationSpeed = 0.3;
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
  Zombie,
};
