'use strict';

const { Game                } = require('../../engine/save_manager');
const { collision_container } = require('../../engine/pixi_containers');

const { HUD } = require('../../view/view_player_inventory');

const keymap = {
  w: 'up',
  n: 'n',
  a: 'left',
  s: 'down',
  d: 'right',
  j: 'down',
  k: 'up',
  h: 'left',
  l: 'right',
  ArrowUp: 'up',
  ArrowLeft: 'left',
  ArrowDown: 'down',
  ArrowRight: 'right',
  i: 'i',
  o: 'o',
  Shift: 'Shift',
};

const buffer = 50;

function point_collides(position) {
  const { children } = collision_container;

  return children.find(child => child.containsPoint(position));
}

class Keyboard {
  constructor({ vitals, sprite, animation}) {
    this.name      = 'keyboard';
    this.vitals    = vitals;
    this.sprite    = sprite;
    this.animation = animation;

    global.window.addEventListener('keydown', event => this.key_down(event.key));
    global.window.addEventListener('keyup',   ()    => this.key_up());
  }

  save_game() {
    Game.save(this.entity);
  }

  key_down(key) {
    const translated_key = keymap[key];
    if (!translated_key) return;

    switch(translated_key) {
      case 'up'   : this.keyboard_up();            return;
      case 'left' : this.keyboard_left();          return;
      case 'down' : this.keyboard_down();          return;
      case 'right': this.keyboard_right();         return;
      case 'n'    : this.save_game();              return;
      case 'o'    : this.start_intro();            return;
      case 'i'    : HUD.toggle_player_inventory(); return;
    }
  }

  key_up() {
    this.animation.idle();
  }

  keyboard_up() {
    this.animation.walk();
    this.animation.face_up();

    const point = this.sprite.getGlobalPosition();
    point.y -= buffer;

    const collision = point_collides(point);
    if(collision){
      this.sprite.gotoAndStop(1);
      return;
    }

    const { movement_speed } = this.vitals;
    this.animation.move_up_by(movement_speed);
  }

  keyboard_down() {
    this.animation.walk();
    this.animation.face_down();

    const point = this.sprite.getGlobalPosition();
    point.y += buffer;

    const collision = point_collides(point);
    if(collision){
      this.sprite.gotoAndStop(1);
      return;
    }

    const { movement_speed } = this.vitals;
    this.animation.move_down_by(movement_speed);
  }

  keyboard_left() {
    this.animation.walk();
    this.animation.face_left();

    const point = this.sprite.getGlobalPosition();
    point.x -= buffer;

    const collision = point_collides(point);
    if(collision){
      this.sprite.gotoAndStop(1);
      return;
    }

    const { movement_speed } = this.vitals;
    this.animation.move_left_by(movement_speed);
  }

  keyboard_right() {
    this.animation.walk();
    this.animation.face_right();

    const point = this.sprite.getGlobalPosition();
    point.x += buffer;

    const collision = point_collides(point);
    if(collision){
      this.sprite.gotoAndStop(1);
      return;
    }

    const { movement_speed } = this.vitals;
    this.animation.move_right_by(movement_speed);
  }
}

module.exports = {
  Keyboard,
};
