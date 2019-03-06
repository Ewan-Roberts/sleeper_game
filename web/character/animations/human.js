'use strict';
const PIXI = require('pixi.js');

const { loader } = require('../../engine/packer');
const { radian } = require('../../utils/math');

class Human {
  constructor(entity) {
    this.name   = 'animation';
    this.state  = 'nothing';
    this.current_action = 'idle';
    entity.sprite = new PIXI.spine.Spine(loader.resources.player.spineData);

    this.sprite = entity.sprite;
    this.entity = entity;
  }

  switch(action) {
    if(this.current_action === action) return;
    // if(!this.sprite.state.hasAnimation(action))
    //   throw new Error('no animation for ' + action);
    const name = this.state + '_' + action;

    this.sprite.state.setAnimation(0, name, true);
    this.current_action = action;
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

