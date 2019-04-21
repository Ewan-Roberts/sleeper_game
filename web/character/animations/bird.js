'use strict';
const PIXI = require('pixi.js');

const { radian } = require('../../utils/math');

//TODO move to dragon
class bird_animations {
  static move_frames() {
    const moving_frames = [];

    for (let i = 19; i > 0; i--) {
      moving_frames.push(PIXI.Texture.fromFrame(`bird_${i}`));
    }
    for (let i = 19; i > 0; i--) {
      moving_frames.push(PIXI.Texture.fromFrame(`bird_${i}`));
      if(i ===4) moving_frames.push(PIXI.Texture.fromFrame(`bird_${i}`));
      if(i ===4) moving_frames.push(PIXI.Texture.fromFrame(`bird_${i}`));
      if(i ===4) moving_frames.push(PIXI.Texture.fromFrame(`bird_${i}`));
      if(i ===4) moving_frames.push(PIXI.Texture.fromFrame(`bird_${i}`));
      if(i ===4) moving_frames.push(PIXI.Texture.fromFrame(`bird_${i}`));
      if(i ===4) moving_frames.push(PIXI.Texture.fromFrame(`bird_${i}`));
      if(i ===4) moving_frames.push(PIXI.Texture.fromFrame(`bird_${i}`));
      if(i ===4) moving_frames.push(PIXI.Texture.fromFrame(`bird_${i}`));
      if(i ===4) moving_frames.push(PIXI.Texture.fromFrame(`bird_${i}`));
      if(i ===5) moving_frames.push(PIXI.Texture.fromFrame(`bird_${i}`));
      if(i ===6) moving_frames.push(PIXI.Texture.fromFrame(`bird_${i}`));
      if(i ===7) moving_frames.push(PIXI.Texture.fromFrame(`bird_${i}`));
      if(i ===8) moving_frames.push(PIXI.Texture.fromFrame(`bird_${i}`));
      if(i ===9) moving_frames.push(PIXI.Texture.fromFrame(`bird_${i}`));
    }


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
    ];

    return waiting_frames;
  }

  static dead_frames() {
    return [ PIXI.Texture.fromFrame('rat_35') ];
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
    ];

    return eating_frames;
  }
}

const frames = {
  move: bird_animations.move_frames(),
};

class Bird {
  constructor(entity) {
    this.name   = 'animation';

    const texture = [PIXI.Texture.fromFrame('bunny')];
    //TODO Finish migrating animation
    this.sprite = new PIXI.extras.AnimatedSprite(texture);
    console.log(this.sprite);
    this.sprite.animationSpeed = 0.19;
    this.sprite.width *=2;
    this.sprite.height *=2;

    this.sprite.anchor.set(0.5);
    this.sprite.rotation = 1;
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
  Bird,
};
