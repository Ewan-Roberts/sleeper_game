'use strict';

const PIXI = require('pixi.js');

require('pixi-sound');

const Sound = PIXI.sound.add({
  arrow_hit_00:   'audio/arrow_hit_00.wav',
  lighter_strike: 'audio/lighter.wav',
  rain_noise:     'audio/light_rain.wav',
  ringing_phone:  'audio/ringing_phone_00.mp3',
  answer_phone:   'audio/answer_phone_00.wav',
  page_turn:      'audio/page_turn.wav',
  wood_split:     'audio/wood_split.wav',
  wood_thump:     'audio/wood_thump.wav',
});

module.exports = Sound;
