'use strict';
const { Texture } = require('pixi.js');
const { radian  } = require('../../utils/math');
const create_texture = (name, i) => Array(i).fill(name).map((filler,j) => Texture.fromFrame(j<10?filler+'0'+j:filler+j));

const zombie_frames = {
  move:   create_texture('walk00', 32),
  attack: create_texture('attack01_00', 20),
  death:  create_texture('death01_00', 16),
  eat:    create_texture('eating00', 24),
  idle:   create_texture('idle00', 32),
};

module.exports = {
  zombie_frames,
};
