'use strict';
const PIXI = require('pixi.js');

const { loader } = require('../../engine/packer');
const { radian } = require('../../utils/math');

class Human {
  constructor(entity) {
    this.name   = 'animation';
    this.state  = undefined;
    entity.sprite = new PIXI.spine.Spine(loader.resources.player_walk.spineData);

    this.sprite = entity.sprite;
  }

  switch(action) {
    if(this.state === action) return;
    if(!this.sprite.state.hasAnimation(action))
      throw new Error('no animation for ' + action);

    this.sprite.state.setAnimation(0, 'walk', true);
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
    this.switch('walk');
  }

  walk() {
    //TODO
    this.switch('walk');
  }

  kill() {

    this.sprite.stop();
    //TODO remove magic number
    this.sprite.height = 120;
    this.sprite.width  = 80;
  }

  set current_weapon(weapon) { this.weapon = weapon; }

  get current_weapon() { return this.weapon; }

  face_up() { this.sprite.rotation = -2; }

  face_down() { this.sprite.rotation = 2; }

  face_left() { this.sprite.rotation = -3; }

  face_right() { this.sprite.rotation = 0; }

  move_up_by(amount) { this.sprite.y -= amount; }

  move_down_by(amount) { this.sprite.y += amount; }

  move_left_by(amount) { this.sprite.x -= amount; }

  move_right_by(amount) { this.sprite.x += amount; }
}


module.exports = {
  Human,
};

