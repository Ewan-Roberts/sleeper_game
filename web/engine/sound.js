'use strict';

const PIXI = require('pixi.js');

require('pixi-sound');

PIXI.sound.add({
  arrow_hit_00:   'audio/arrow_hit_00.wav',
  lighter_strike: 'audio/lighter.wav',
  rain_noise:     'audio/light_rain.wav',
});

const Sound = PIXI.sound;

module.exports = {
  Sound,
};
