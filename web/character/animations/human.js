'use strict';
const { Texture, extras } = require('pixi.js');

const { radian } = require('../../utils/math');

// this makes an array of textures that and 0 before 10 in the name
const create_texture = (name, i) => Array(i).fill(name).map((filler,j) => Texture.fromFrame(j<10?filler+'0'+j:filler+j));

const nothing_idle = create_texture('Armature_nothing_idle_', 37);
const nothing_walk = create_texture('Armature_nothing_walk_', 49);
const candle_idle  = create_texture('Armature_candle_idle_', 37);
const candle_walk  = create_texture('Armature_candle_walk_', 49);
const bow_walk     = create_texture('survivor-walk_bow_', 21);
const bow_idle     = create_texture('survivor-bow-idle-', 22);
const bow_shoot    = create_texture('survivor-bow-pull-', 39);
const knife_idle   = Array(20).fill('survivor-move_knife_').map((name, i) => Texture.fromFrame(name+i));
const knife_move   = Array(20).fill('survivor-move_knife_').map((name, i) => Texture.fromFrame(name+i));
const knife_attack = Array(15).fill('survivor-meleeattack_knife_').map((name, i) => Texture.fromFrame(name+i));
//const knife_attack = 'survivor-meleeattack_knife_'.repeat(15).split('').map((name, i) => Texture.fromFrame(name+i));

class Human {
  constructor(entity) {
    this.name   = 'animation';
    this.state  = 'bow';

    entity.sprite = new extras.AnimatedSprite(nothing_idle);
    this.sprite = entity.sprite;
    this.sprite.anchor.set(0.5);
    this.sprite.width  /= 6;
    this.sprite.height /= 6;
    this.entity = entity;
    this.prefix = 'nothing';
    this.sprite.id = entity.id;
    this.sprite.play();

    this.animations = {
      nothing_idle,
      nothing_walk,
      candle_idle,
      candle_walk,
      bow_walk,
      bow_idle,
      bow_shoot,
      knife_idle,
      knife_walk: knife_move,
      knife_shoot: knife_attack,
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

