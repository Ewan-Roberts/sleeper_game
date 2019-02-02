'use strict';

const { viewport } = require('./viewport');
const { Game     } = require('./save_manager');

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

class Keyboard {
  constructor() {
    this.inventory_open = false;
    this.moveable = true;
    this.movement_speed = 15;
    this.buffer = 50;
    this.shift_pressed = false;
  }


  save_game() {
    Game.save(this);
    console.log('saved');
    console.log(this);
  }

  key_down({ key }) {
    const button = keymap[key];
    if (!this.moveable || !button ) return;

    this.loop = true;

    switch(button) {
      case 'up':    this.keyboard_up();             return;
      case 'left':  this.left();                    return;
      case 'down':  this.keyboard_down();           return;
      case 'right': this.right();                   return;
      case 'i':     this.toggle_player_inventory(); return;
      case 'n':     this.save_game();               return;
      case 'o':     this.start_intro();             return;
      case 'Shift': this.shift();                   return;
    }
  }

  stop_input() {
    this.moveable = false;
  }

  key_up() {
    this.shift_pressed = false;

    this.animation_switch('bow', 'idle');
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
      this.show_player_inventory();
      this.inventory_open = true;
    } else {
      this.hide_player_inventory();
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
