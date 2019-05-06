'use strict';
const PIXI = require('pixi.js');

const {
  collisions,
  roofs,
  pads,
  shrouds,
} = require('../../engine/pixi_containers');

const { world    } = require('../../engine/shadows');
const { View_HUD } = require('../../view/view_player_inventory');
const { Fade     } = require('../../effects/fade');

function point_collides(position) {
  const { children } = collisions;

  return !!children.find(child => child.containsPoint(position));
}

//TODO this could be more performant using proximity
//and this logic should be split out or put in ceiling
function point_contains(position) {
  const shroud = shrouds.children ;
  const shrouds_to_remove = shroud.find(child => child.containsPoint(position));
  if (shrouds_to_remove && shrouds_to_remove.remove_on_enter) {
    Fade.out_destroy(shrouds_to_remove);
    delete shrouds_to_remove.remove_on_enter;
  }
  return;
  const roof = roofs.children ;
  roof.forEach(child => {
    const tweening = PIXI.tweenManager.getTweensForTarget(child);
    if(tweening.length>=1) return;
    if(child.containsPoint(position)) {
      Fade.to(child, child.fade_opacity | 0.6);

      return;
    }
    if(child.alpha !== 1) {
      Fade.in(child);
    }
  });
}

function event_pad(position) {
  const { children } = pads;

  const pad = children.find(child => child.containsPoint(position));

  if(pad) pad.events.emit('trigger');
}

class Keyboard {
  constructor({ animation, sprite, vitals, light }) {
    this.name          = 'keyboard';
    this.animation     = animation;
    this.sprite        = sprite;
    this.speed         = vitals.speed/2;
    this.buffer        = 50;
    this.can_move      = true;
    this.light         = light;

    PIXI.keyboardManager.on('down', key => this.key_down(key));
    PIXI.keyboardManager.on('released', () => this.key_up());
  }

  //TODO
  save_game() {
  }

  key_down(key) {
    if(!PIXI.keyboardManager.isEnabled) return;

    switch(key) {
      // wasd
      case  87     : this.keyboard_up();          return;// w
      case  83     : this.keyboard_down();        return;// s
      case  65     : this.keyboard_left();        return;// a
      case  68     : this.keyboard_right();       return;// d
      // vim
      case  75     : this.keyboard_up();          return;// k
      case  74     : this.keyboard_down();        return;// j
      case  72     : this.keyboard_left();        return;// h
      case  76     : this.keyboard_right();       return;// l

      case  81     : this.speed = 20;             return;// q for speed
      case 'n'     : this.save_game();            return;
      case 'i'     : View_HUD.toggle_inventory(); return;
      default      : return;
    }
  }

  key_up() {
    this.animation.idle();
  }

  enable() {
    PIXI.keyboardManager.enable();
  }

  disable() {
    PIXI.keyboardManager.disable();
  }

  keyboard_up() {
    const point = this.sprite.getGlobalPosition();
    point.y -= this.buffer;

    if(point_collides(point)) return this.animation.idle();

    point_contains(point);
    event_pad(point);

    this.animation.walk();
    this.animation.face_up();
    this.animation.move_up_by(this.speed);
    if(this.light) this.light.set_position(this.sprite);

    world.y += this.speed;
  }

  keyboard_down() {
    const point = this.sprite.getGlobalPosition();
    point.y += this.buffer;

    if(point_collides(point)) return this.animation.idle();

    point_contains(point);
    event_pad(point);

    this.animation.walk();
    this.animation.face_down();
    this.animation.move_down_by(this.speed);
    if(this.light) this.light.set_position(this.sprite);

    world.y -= this.speed;
  }

  keyboard_left() {
    const point = this.sprite.getGlobalPosition();
    point.x -= this.buffer;

    if(point_collides(point)) return this.animation.idle();

    point_contains(point);
    event_pad(point);

    this.animation.walk();
    this.animation.face_left();
    this.animation.move_left_by(this.speed);
    if(this.light) this.light.set_position(this.sprite);

    world.x += this.speed;
  }

  keyboard_right() {
    const point = this.sprite.getGlobalPosition();
    point.x += this.buffer;

    if(point_collides(point)) return this.animation.idle();

    point_contains(point);
    event_pad(point);

    this.animation.walk();
    this.animation.face_right();
    this.animation.move_right_by(this.speed);
    if(this.light) this.light.set_position(this.sprite);

    world.x -= this.speed;
  }
}

module.exports = {
  Keyboard,
};
