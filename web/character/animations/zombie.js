'use strict';
const { Texture } = require('pixi.js');
const { radian  } = require('../../utils/math');
// this makes an array of textures that and 0 before 10 in the name
const create_texture = (name, i) => Array(i).fill(name).map((filler,j) => Texture.fromFrame(j<10?filler+'0'+j:filler+j));

const move   = create_texture('walk00', 32);
const attack = create_texture('attack01_00', 20);
const death  = create_texture('death01_00', 16);
const eat    = create_texture('eating00', 24);
const idle   = create_texture('idle00', 32);

const frames = { move, attack, death, eat, idle };

class Zombie {
  constructor(sprite) {
    this.name = 'animation';

    this.sprite = sprite;
  }

  switch(action) {
    if (this.state === action) return;

    this.sprite.textures = frames[action];
    this.sprite.play();
    this.state = action;
  }

  face_point(point) {
    this.sprite.rotation = radian(point, this.sprite);
  }

  wait() {this.switch('idle');}
  idle() {this.switch('idle');}
  eat()  {this.switch('eat'); }
  move() {this.switch('move');}
  walk() {this.switch('move');}

  kill() {
    this.switch('death');
    this.sprite.loop = false;
  }

  attack() {this.switch('attack');}
}


module.exports = {
  Zombie,
};
