'use strict';

const { viewport } = require('../../engine/viewport');
const { Game     } = require('../../engine/save_manager');

const dom_hud = global.document.querySelector('.characterInventory');

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

class Keyboard {
  constructor(entity) {
    this.name = 'keyboard_manager';
    this.entity = entity;
    this.sprite = entity.sprite;
    global.window.addEventListener('keydown', event => this.key_down(event));
    global.window.addEventListener('keyup', () => this.key_up());
  }

  save_game() {
    Game.save(this.entity);
  }

  key_down({ key }) {
    const button = keymap[key];
    if (!button) return;

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

  toggle_player_inventory() {

    if(dom_hud.style.display === 'block') {
      dom_hud.style.opacity = 0;
      dom_hud.style.display = 'none';

      return;
    }

    dom_hud.style.opacity = 1;
    dom_hud.style.display = 'block';
  }

  key_up() {
    //TODO Remove lie to player model
    this.entity.animation_switch('bow', 'idle');
  }

  keyboard_up() {
    this.entity.animation_switch('bow', 'walk');
    this.sprite.rotation = -2;

    const collision_objects = viewport.getChildByName('collision_items');

    for(let i = 0; i < collision_objects.children.length; i++){
      const position = this.sprite.getGlobalPosition();
      position.y -= buffer;

      if(collision_objects.children[i].containsPoint(position)){
        this.sprite.gotoAndStop(1);

        return;
      }
    }

    this.sprite.y -= this.entity.vitals.movement_speed;
  }

  keyboard_down() {
    this.entity.animation_switch('bow', 'walk');
    this.sprite.rotation = 2;

    const collision_objects = viewport.getChildByName('collision_items');

    for(let i = 0; i < collision_objects.children.length; i++){
      const position = this.sprite.getGlobalPosition();
      position.y += buffer;

      if(collision_objects.children[i].containsPoint(position)){
        this.sprite.gotoAndStop(1);

        return;
      }
    }

    this.sprite.y += this.entity.vitals.movement_speed;
  }

  left() {
    this.entity.animation_switch('bow', 'walk');
    this.sprite.rotation = -3;

    const collision_objects = viewport.getChildByName('collision_items');

    for(let i = 0; i < collision_objects.children.length; i++){
      const position = this.sprite.getGlobalPosition();
      position.x -= buffer;

      if(collision_objects.children[i].containsPoint(position)){
        this.sprite.gotoAndStop(1);

        return;
      }
    }

    this.sprite.x -= this.entity.vitals.movement_speed;
  }

  right() {
    this.entity.animation_switch('bow', 'walk');
    this.sprite.rotation = 0;

    const collision_objects = viewport.getChildByName('collision_items');

    for(let i = 0; i < collision_objects.children.length; i++){
      const position = this.sprite.getGlobalPosition();
      position.x += buffer;

      if(collision_objects.children[i].containsPoint(position)){
        this.sprite.gotoAndStop(1);

        return;
      }
    }

    this.sprite.x += this.entity.vitals.movement_speed;
  }

  shift() {
    // console.log('shift_pressed');
  }
}

module.exports = {
  Keyboard,
};
