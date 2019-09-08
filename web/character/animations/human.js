const { Texture } = require('pixi.js');

const create_texture = (name, i) => Array(i).fill(name).map((filler, j) => Texture.fromFrame(j < 10 ? filler + '0' + j : filler + j));
const human_frames = {
  'nothing_idle': create_texture('Armature_nothing_idle_', 37),
  'nothing_move': create_texture('Armature_nothing_walk_', 49),
  'candle_idle' : create_texture('Armature_candle_idle_', 37),
  'candle_move' : create_texture('Armature_candle_walk_', 49),
  'bow_idle'    : create_texture('survivor-bow-idle-', 22),
  'bow_move'    : create_texture('survivor-walk_bow_', 21),
  'bow_shoot'   : create_texture('survivor-bow-pull-', 35),
  'knife_idle'  : Array(20).fill('survivor-move_knife_').map((name, i) => Texture.fromFrame(name + i)),
  'knife_move'  : Array(20).fill('survivor-move_knife_').map((name, i) => Texture.fromFrame(name + i)),
  'knife_attack': Array(15).fill('survivor-meleeattack_knife_').map((name, i) => Texture.fromFrame(name + i)),
};

class PlayerAnimation {
  constructor(sprite) {
    this.name   = 'animation';
    this.state  = 'bow';
    this.sprite = sprite;
    this.prefix = 'nothing';

    this._set_sound();
  }

  _set_sound() {
    // this.walk_sound = sound.find('walk_normal');
    // this.walk_sound.loop = true;
    // this.walk_sound.volume = 0.05;
  }

  switch(action) {
    if(this.state === action) {
      return;
    }
    this.sprite.textures = human_frames[action];

    this.sprite.play();

    this.state = action;
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
      // this.walk_sound.play();
    }
    this.switch(this.prefix + '_walk');
  }

  kill() {
    this.switch(this.prefix + '_walk');
  }

  set current_weapon(weapon) {
    this.weapon = weapon;
  }

  get current_weapon() {
    return this.weapon;
  }
}

module.exports = {
  PlayerAnimation,
  human_frames,
};
