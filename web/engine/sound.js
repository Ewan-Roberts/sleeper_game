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
  door_locked:    'audio/door-locked-sound.wav',
  honk:           'audio/honk.wav',
  suspense_in:    'audio/suspense_in.wav',
  eerie_ambient:  'audio/eerie-ambient-sound.wav',
  horror_theme:   'audio/horror_music.wav',
  start_theme:    'audio/start-theme.wav',
  click:          'audio/click.wav',
  static_effect:  'audio/tv-static.wav',
  walk_normal:    'audio/walk_normal.wav',
  birds_fly_away: 'audio/birds_fly_away.wav',
  whisper_effect: 'audio/whisper_effect.wav',
  keys_jingle:    'audio/keys_jingle.wav',
  thud_1:         'audio/thud_1.wav',
  thud_2:         'audio/thud_2.wav',
  thud_3:         'audio/thud_3.wav',
  thud_4:         'audio/thud_4.wav',
  thud_5:         'audio/thud_5.wav',
  thud_6:         'audio/thud_6.wav',
  thud_7:         'audio/thud_7.wav',
});

sound.random_sound_from = array => {
  const name = array[Math.floor(Math.random()*array.length)];
  return sound.find(name);
};

module.exports = Sound;
