'use strict';
const PIXI = require('pixi.js');

const { radian } = require('../../utils/math');

class animation {
  static idle_nothing() {
    const frames = [];
    for (let i = 0; i <= 36; i++) {
      const name = (i<10)?`Armature_nothing_idle_0${i}`:`Armature_nothing_idle_${i}`;

      frames.push(PIXI.Texture.fromFrame(name));
    }

    return frames;
  }
}

class Human {
  constructor(entity) {
    this.name   = 'animation';
    this.state  = 'nothing';
    this.current_action = 'idle';
    this.idle_texture = animation.idle_nothing();
    entity.sprite = new PIXI.extras.AnimatedSprite(this.idle_texture);
    this.sprite = entity.sprite;
    this.sprite.anchor.set(0.5);
    this.entity = entity;
  }

  switch(action) {
    if (this.state === action) return;

    this.sprite.textures = this.idle_texture;
    this.sprite.loop = true;
    this.sprite.play();
    this.state = action;
  }

  set state_to (name) {
    this.state = name;
  }

  face_point(point) {
    this.sprite.rotation = radian(point, this.sprite);
  }

  ready_weapon() {
    //TODO
    this.switch('walk');
  }

  attack() {
    //TODO
    this.switch('walk');
  }

  idle() {
    //TODO
    this.switch('idle');
  }

  walk() {
    //TODO
    this.switch('walk');
  }

  //TODO for testing
  custom(name){
    //TODO
    this.sprite.state.setAnimation(0, name, true);
  }


  kill() {
    //TODO
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

