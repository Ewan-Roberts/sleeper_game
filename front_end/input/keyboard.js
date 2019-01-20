'use strict';

const { Vitals   } = require('../character/attributes/inventory');
const { viewport } = require('../engine/viewport');

const keymap = {
  w: 'up',
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

class Keyboard {
  constructor() {
    this.inventory_open = false;
    this.moveable = true;
    this.movement_speed = 15;
    this.buffer = 50;
    this.sprite = viewport.getChildByName('player');
    this.shift_pressed = false;
  }

  key_down(e) {
    if (!this.moveable) return;
    if(!e) return;
    const key = keymap[e.key];
    if(!key) return;
    this.loop = true;

    switch(key) {
      case 'up':
        this.keyboard_up();
        break;
      case 'left':
        this.left();
        break;
      case 'down':
        this.keyboard_down();
        break;
      case 'right':
        this.right();
        break;
      case 'i':
        this.inventory();
        break;
      case 'o':
        this.start_intro();
        break;
      case 'Shift':
        this.shift();
        break;
    }
  }

  static stop_input() {
    this.moveable = false;
  }

  key_up() {
    this.shift_pressed = false;
    this.sprite.textures = this.sprite.animations.bow.idle;
    this.sprite.play();
  }

  keyboard_up() {
    this.animation_switch('bow', 'walk');
    this.sprite.rotation = -2;

    const collision_objects = viewport.getChildByName('collision_items');

    for(let i = 0; i < collision_objects.children.length; i++){
      const player_position = this.sprite.getGlobalPosition();

      player_position.y -= this.buffer;

      if(collision_objects.children[i].containsPoint(player_position)){
        this.sprite.gotoAndStop(1);
        if(collision_objects.children[i].moveable) {
          this.sprite.y -= this.movement_speed / 4;
          collision_objects.children[i].y -= this.movement_speed / 4;
        }
        return;
      }
    }

    this.sprite.y -= this.movement_speed;

  }

  keyboard_down() {
    this.animation_switch('bow', 'walk');
    this.sprite.rotation = 2;

    const collision_objects = viewport.getChildByName('collision_items');

    for(let i = 0; i < collision_objects.children.length; i++){
      const player_position = this.sprite.getGlobalPosition();

      player_position.y += this.buffer;

      if(collision_objects.children[i].containsPoint(player_position)){
        this.sprite.gotoAndStop(1);

        if(collision_objects.children[i].moveable) {
          this.sprite.y += this.movement_speed / 4;
          collision_objects.children[i].y += this.movement_speed / 4;
        }
        return;
      }
    }

    this.sprite.y += this.movement_speed;
  }

  left() {
    this.animation_switch('bow', 'walk');
    this.sprite.rotation = -3;
    const collision_objects = viewport.getChildByName('collision_items');

    for(let i = 0; i < collision_objects.children.length; i++){
      const player_position = this.sprite.getGlobalPosition();

      player_position.x -= this.buffer;

      if(collision_objects.children[i].containsPoint(player_position)){
        this.sprite.gotoAndStop(1);

        if(collision_objects.children[i].moveable) {
          this.sprite.x -= this.movement_speed / 4;
          collision_objects.children[i].x -= this.movement_speed / 4;
        }
        return;
      }
    }
    this.sprite.x -= this.movement_speed;

  }

  right() {
    this.animation_switch('bow', 'walk');
    this.sprite.rotation = 0;

    const collision_objects = viewport.getChildByName('collision_items');

    for(let i = 0; i < collision_objects.children.length; i++){
      const player_position = this.sprite.getGlobalPosition();

      player_position.x += this.buffer;

      if(collision_objects.children[i].containsPoint(player_position)){
        this.sprite.gotoAndStop(1);


        if(collision_objects.children[i].moveable) {
          this.sprite.x += this.movement_speed / 4;
          collision_objects.children[i].x += this.movement_speed / 4;
        }
        return;
      }
    }
    this.sprite.x += this.movement_speed;

  }

  inventory() {
    if ( this.inventory_open === false ) {
      Vitals.show_player_inventory();
      this.inventory_open = true;
    } else {
      Vitals.hide_player_inventory();
      this.inventory_open = false;
    }
  }

  shift() {
    this.shift_pressed = true;
  }
}

module.exports = {
  Keyboard,
};
