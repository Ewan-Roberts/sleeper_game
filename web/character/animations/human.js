'use strict';
const { Texture, sound } = require('pixi.js');
const { radian         } = require('../../utils/math');

const create_texture = (name, i) => Array(i).fill(name).map((filler,j) => Texture.fromFrame(j<10?filler+'0'+j:filler+j));
const animations = {
  nothing_idle : create_texture('Armature_nothing_idle_', 37),
  nothing_walk : create_texture('Armature_nothing_walk_', 49),
  candle_idle  : create_texture('Armature_candle_idle_', 37),
  candle_walk  : create_texture('Armature_candle_walk_', 49),
  bow_walk     : create_texture('survivor-walk_bow_', 21),
  bow_idle     : create_texture('survivor-bow-idle-', 22),
  bow_shoot    : create_texture('survivor-bow-pull-', 35),
  knife_idle   : Array(20).fill('survivor-move_knife_').map((name, i) => Texture.fromFrame(name+i)),
  knife_move   : Array(20).fill('survivor-move_knife_').map((name, i) => Texture.fromFrame(name+i)),
  knife_attack : Array(15).fill('survivor-meleeattack_knife_').map((name, i) => Texture.fromFrame(name+i)),
};

class Animation {
  constructor(sprite) {
    this.name = 'animation';
    this.state  = 'bow';
    this.sprite = sprite;
    this.walk_sound = sound.find('walk_normal', {loop: true});
    this.walk_sound.loop = true;
    this.walk_sound.volume = 0.2;
    this.prefix = 'nothing';
  }

  switch(action) {
    if (this.state === action) return;
    this.sprite.textures = animations[action];

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
    this.walk_sound.stop();
    this.switch(this.prefix + '_idle');
  }

  walk() {
    if(!this.walk_sound.isPlaying) {
      this.walk_sound.play();
    }
    this.switch(this.prefix + '_walk');
  }

  kill() {
    this.switch(this.prefix + '_walk');
  }

  set current_weapon(weapon) { this.weapon = weapon; }

  get current_weapon() { return this.weapon; }

  face_up_left()    { this.sprite.rotation = -2.5; }
  face_up_right()   { this.sprite.rotation = -0.8; }
  face_down_left()  { this.sprite.rotation = 2.5;  }
  face_down_right() { this.sprite.rotation = 1;    }
  face_down()       { this.sprite.rotation = 2;    }
  face_up()         { this.sprite.rotation = -2;   }
  face_left()       { this.sprite.rotation = -3;   }
  face_right()      { this.sprite.rotation = 0;    }
}


module.exports = {
  Animation,
};


