require('pixi-sound');
const { sound } = require('pixi.js');

const Sound = sound.add({
  arrow_hit_00:       'audio/arrow_hit_00.mp3',
  page_turn:          'audio/page_turn.mp3',
  wood_thump:         'audio/wood_thump.mp3',
  door_locked:        'audio/door-locked-sound.mp3',
  honk:               'audio/honk.mp3',
  suspense_in:        'audio/suspense_in.mp3',
  eerie_ambient:      'audio/eerie-ambient-sound.mp3',
  horror_theme:       'audio/horror_music.mp3',
  start_theme:        'audio/start-theme.mp3',
  click:              'audio/click.mp3',
  revolver_cock:      'audio/revolver_cock.mp3',
  walk_normal:        'audio/walk_normal.mp3',
  birds_fly_away:     'audio/birds_fly_away.mp3',
  whisper_effect:     'audio/whisper_effect.mp3',
  keys_jingle:        'audio/keys_jingle.mp3',
  thud_1:             'audio/thud_1.mp3',
  thud_2:             'audio/thud_2.mp3',
  thud_3:             'audio/thud_3.mp3',
  thud_4:             'audio/thud_4.mp3',
  thud_5:             'audio/thud_5.mp3',
  thud_6:             'audio/thud_6.mp3',
  thud_7:             'audio/thud_7.mp3',
  //  ranbir_rant_normal: 'audio/ranbir_rant_normal.mp3',
  woman_weeping:      'audio/woman_weeping.mp3',
  crazy_woman_repent: 'audio/crazy_woman_repent.mp3',
});

sound.random_sound_from = array => {
  const name = array[Math.floor(Math.random()*array.length)];
  return sound.find(name);
};

module.exports = Sound;
