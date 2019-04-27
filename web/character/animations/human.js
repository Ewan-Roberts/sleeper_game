'use strict';
const PIXI = require('pixi.js');

const { radian } = require('../../utils/math');

class animation {
  static nothing_idle() {
    const frames = [];
    for (let i = 0; i <= 36; i++) {
      const name = (i<10)?`Armature_nothing_idle_0${i}`:`Armature_nothing_idle_${i}`;

      frames.push(PIXI.Texture.fromFrame(name));
    }

    return frames;
  }

  static nothing_walk() {
    const frames = [];
    for (let i = 0; i <= 48; i++) {
      const name = (i<10)?`Armature_nothing_walk_0${i}`:`Armature_nothing_walk_${i}`;

      frames.push(PIXI.Texture.fromFrame(name));
    }

    return frames;
  }

  static candle_idle() {
    const frames = [];
    for (let i = 0; i <= 36; i++) {
      const name = (i<10)?`Armature_candle_idle_0${i}`:`Armature_candle_idle_${i}`;

      frames.push(PIXI.Texture.fromFrame(name));
    }

    return frames;
  }

  static knife_idle() {
    const frames = [];
    for (let i = 0; i <= 19; i++) {
      const name = `survivor-move_knife_${i}`;

      frames.push(PIXI.Texture.fromFrame(name));
    }

    return frames;
  }

  static knife_move() {
    const frames = [];
    for (let i = 0; i <= 19; i++) {
      const name = `survivor-move_knife_${i}`;

      frames.push(PIXI.Texture.fromFrame(name));
    }

    return frames;
  }

  static knife_attack() {
    const frames = [];
    for (let i = 0; i <= 14; i++) {
      const name = `survivor-meleeattack_knife_${i}`;

      frames.push(PIXI.Texture.fromFrame(name));
    }

    return frames;
  }

  static bow_walk() {
    const frames = [];
    for (let i = 0; i <= 20; i++) {
      const name = (i<10)?`survivor-walk_bow_0${i}`:`survivor-walk_bow_${i}`;

      frames.push(PIXI.Texture.fromFrame(name));
    }

    return frames;
  }


  static bow_idle() {
    const frames = [];
    for (let i = 0; i <= 21; i++) {
      const name = (i<10)?`survivor-bow-idle-0${i}`:`survivor-bow-idle-${i}`;

      frames.push(PIXI.Texture.fromFrame(name));
    }

    return frames;
  }

  static bow_shoot() {
    const frames = [];
    for (let i = 0; i <= 38; i++) {
      const name = (i<10)?`survivor-bow-pull-0${i}`:`survivor-bow-pull-${i}`;

      frames.push(PIXI.Texture.fromFrame(name));
    }

    return frames;
  }

  static candle_walk() {
    const frames = [];
    for (let i = 0; i <= 48; i++) {
      const name = (i<10)?`Armature_candle_walk_0${i}`:`Armature_candle_walk_${i}`;

      frames.push(PIXI.Texture.fromFrame(name));
    }

    return frames;
  }

}

class Human {
  constructor(entity) {
    this.name   = 'animation';
    this.state  = 'bow';
    const idle_texture = animation.nothing_idle();

    entity.sprite = new PIXI.extras.AnimatedSprite(idle_texture);
    this.sprite = entity.sprite;
    this.sprite.anchor.set(0.5);
    this.sprite.width  /= 2;
    this.sprite.height /= 2;
    this.entity = entity;
    this.prefix = 'nothing';

    this.animations = {
      nothing_idle : animation.nothing_idle(),
      nothing_walk : animation.nothing_walk(),
      candle_idle  : animation.candle_idle(),
      candle_walk  : animation.candle_walk(),
      bow_walk     : animation.bow_walk(),
      bow_idle     : animation.bow_idle(),
      bow_shoot    : animation.bow_shoot(),
      knife_idle   : animation.knife_idle(),
      knife_walk   : animation.knife_move(),
      knife_shoot  : animation.knife_attack(),
    };
  }

  switch(action) {
    if (this.state === action) return;
    this.sprite.textures = this.animations[action];

    this.sprite.play();

    this.state = action;
  }

  set rotation(amount) {
    this.sprite.rotation = amount;
  }

  set speed(amount) {
    this.sprite.animationSpeed = amount;
  }

  set state_to (name) {
    this.state = name;
  }

  face_point(point) {
    this.sprite.rotation = radian(point, this.sprite);
  }

  ready_weapon() {
    this.switch(this.prefix + '_shoot');
    this.sprite.loop = false;
  }

  attack() {
    this.switch(this.prefix + '_walk');
  }

  idle() {
    this.switch(this.prefix + '_idle');
  }

  walk() {
    this.switch(this.prefix + '_walk');
  }

  kill() {
    this.switch('walk');
  }

  set current_weapon(weapon) { this.weapon = weapon; }

  get current_weapon() { return this.weapon; }

  face_up() { this.sprite.rotation = -2; }

  face_down() { this.sprite.rotation = 2; }

  face_left() { this.sprite.rotation = -3; }

  face_right() { this.sprite.rotation = 0; }

  move_up_by(amount) {
    this.sprite.y -= amount;
  }

  move_down_by(amount) {
    this.sprite.y += amount;
  }

  move_left_by(amount) {
    this.sprite.x -= amount;
  }

  move_right_by(amount) {
    this.sprite.x += amount;
  }
}


module.exports = {
  Human,
};

