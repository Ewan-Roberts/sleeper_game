'use strict';

const { Game                } = require('../../engine/save_manager');
const { collision_container } = require('../../engine/pixi_containers');
const { world, shadow       } = require('../../engine/shadows');

const { View_HUD } = require('../../view/view_player_inventory');

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


function point_collides(position) {
  const { children } = collision_container;

  return children.find(child => child.containsPoint(position));
}

class Keyboard {
  constructor(entity) {
    this.name   = 'keyboard';
    this.entity = entity;
    this.shift_pressed = false;
    this.speed = this.entity.vitals.speed;
    this.buffer = 50;

    global.window.addEventListener('keydown', event => this.key_down(event.key));
    global.window.addEventListener('keyup',   ()    => this.key_up());
  }

  save_game() { Game.save(this.entity); }

  key_down(key) {
    switch(keymap[key]) {
      case 'up'    : this.keyboard_up();          return;
      case 'left'  : this.keyboard_left();        return;
      case 'down'  : this.keyboard_down();        return;
      case 'right' : this.keyboard_right();       return;
      case 'n'     : this.save_game();            return;
      case 'o'     : this.start_intro();          return;
      case 'i'     : View_HUD.toggle_inventory(); return;
      case 'Shift' : this.keyboard_shift();       return;
      default      : return;
    }
  }

  key_up() {
    //TODO bug player could hold two buttons
    this.shift_pressed = false;

    this.entity.animation.idle();
  }

  keyboard_shift() { this.shift_pressed = true; }

  keyboard_up() {
    this.entity.animation.walk();
    this.entity.animation.face_up();

    const point = this.entity.sprite.getGlobalPosition();
    point.y -= this.buffer;

    const collision = point_collides(point);
    if(collision) return this.entity.animation.idle();

    this.entity.animation.move_up_by(this.speed);
    shadow.position.copy(point);

    world.y += this.speed;
  }

  keyboard_down() {
    this.entity.animation.walk();
    this.entity.animation.face_down();

    const point = this.entity.sprite.getGlobalPosition();
    point.y += this.buffer;

    const collision = point_collides(point);
    if(collision) return this.entity.animation.idle();

    this.entity.animation.move_down_by(this.speed);
    shadow.position.copy(point);

    world.y -= this.speed;
  }

  keyboard_left() {
    this.entity.animation.walk();
    this.entity.animation.face_left();

    const point = this.entity.sprite.getGlobalPosition();
    point.x -= this.buffer;

    const collision = point_collides(point);
    if(collision) return this.entity.animation.idle();

    this.entity.animation.move_left_by(this.speed);
    shadow.position.copy(point);

    world.x += this.speed;
  }

  keyboard_right() {
    this.entity.animation.walk();
    this.entity.animation.face_right();

    const point = this.entity.sprite.getGlobalPosition();
    point.x += this.buffer;

    const collision = point_collides(point);
    if(collision) return this.entity.animation.idle();

    this.entity.animation.move_right_by(this.speed);
    shadow.position.copy(point);

    world.x -= this.speed;
  }
}

module.exports = {
  Keyboard,
};
