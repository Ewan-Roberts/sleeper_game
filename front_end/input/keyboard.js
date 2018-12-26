'use strict';

const { GUI_HUD } = require('../gui/inventory');
const gui = new GUI_HUD();
const viewport = require('../engine/viewport');
const { Intro_Cutscene } = require('../cutscene/cutscenes/intro');

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
    this.player = viewport.getChildByName('player');
    this.player.shift_pressed = false;
  }

  key_down(e) {
    if (!this.moveable) return;
    if(!e) return;
    const key = keymap[e.key];
    if(!key) return;
    this.loop = true;

    switch(key) {
      case 'up':
        this.up();
        break;
      case 'left':
        this.left();
        break;
      case 'down':
        this.down();
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
    this.player.shift_pressed = false;
    this.player.textures = this.player.animations.bow.idle;
    this.player.play();
  }

  up() {
    this.player.animation_switch('bow', 'walk');
    const collision_objects = viewport.getChildByName('collision_items');

    for(let i = 0; i < collision_objects.children.length; i++){
      const player_position = this.player.getGlobalPosition();

      player_position.y -= this.buffer;

      if(collision_objects.children[i].containsPoint(player_position)){
        this.player.gotoAndStop(1);
        return;
      }
    }

    this.player.y -= this.movement_speed;
    this.player.rotation = -2;
  }

  down() {
    this.player.animation_switch('bow', 'walk');


    const collision_objects = viewport.getChildByName('collision_items');

    for(let i = 0; i < collision_objects.children.length; i++){
      const player_position = this.player.getGlobalPosition();

      player_position.y += this.buffer;

      if(collision_objects.children[i].containsPoint(player_position)){
        this.player.gotoAndStop(1);
        return;
      }
    }

    this.player.y += this.movement_speed;
    this.player.rotation = 2;
  }

  left() {
    this.player.animation_switch('bow', 'walk');

    const collision_objects = viewport.getChildByName('collision_items');

    for(let i = 0; i < collision_objects.children.length; i++){
      const player_position = this.player.getGlobalPosition();

      player_position.x -= this.buffer;

      if(collision_objects.children[i].containsPoint(player_position)){
        this.player.gotoAndStop(1);
        return;
      }
    }

    this.player.x -= this.movement_speed;
    this.player.rotation = -3;
  }

  right() {
    this.player.animation_switch('bow', 'walk');

    const collision_objects = viewport.getChildByName('collision_items');

    for(let i = 0; i < collision_objects.children.length; i++){
      const player_position = this.player.getGlobalPosition();

      player_position.x += this.buffer;

      if(collision_objects.children[i].containsPoint(player_position)){
        this.player.gotoAndStop(1);
        return;
      }
    }

    this.player.x += this.movement_speed;
    this.player.rotation = 0;
  }

  inventory() {
    if ( this.inventory_open === false ) {
      gui.show();
      this.inventory_open = true;
    } else {
      gui.hide();
      this.inventory_open = false;
    }
  }

  start_intro() {
    const intro = new Intro_Cutscene();
    intro.start();
  }

  shift() {
    this.player.shift_pressed = true;
  }
}

module.exports = {
  Keyboard,
};
