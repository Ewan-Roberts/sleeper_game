'use strict';
require('pixi-sound');
const { sound } = require('pixi.js');

const Sound = sound.add({
  arrow_hit_00:   'audio/arrow_hit_00.wav',
  lighter_strike: 'audio/lighter.wav',
  rain_noise:     'audio/light_rain.wav',
  ringing_phone:  'audio/ringing_phone_00.mp3',
  answer_phone:   'audio/answer_phone_00.wav',
  page_turn:      'audio/page_turn.wav',
  wood_split:     'audio/wood_split.wav',
  wood_thump:     'audio/wood_thump.wav',
  honk:           'audio/honk.wav',
  suspense_in:    'audio/suspense_in.wav',
  eerie_ambient:  'audio/eerie-ambient-sound.wav',
  start_theme:    'audio/start-theme.wav',
  click:          'audio/click.wav',
  static_effect:  'audio/tv-static.wav',
  walk_normal:     'audio/walk_normal.wav',
});

module.exports = Sound;
